<template>
  <div>
    <a-form :form="form" layout="vertical" @submit="handleSubmit">
      <a-form-item>
        <span slot="label">
          REXX 文件名
          <a-popover style="cursor: pointer">
            <template slot="content">
              <p>文件名可以是顺序数据集或分区数据集成员。</p>
              <p>平台是通过 JCL 来提交执行 REXX 代码的，需要</p>
              <p>把 REXX 代码保存到文件中才能执行该代码 😅。</p>
            </template>
            <a-icon type="question-circle" />
          </a-popover>
        </span>
        <a-input
          placeholder="请输入 REXX 文件名"
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: '请输入 REXX 文件名' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="REXX 代码">
        <a-textarea
          placeholder="请输入 REXX 代码"
          :autosize="{ minRows: 5 }"
          v-decorator="[
            'code',
            {
              rules: [{ required: true, message: '请输入 REXX 代码' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item>
        <span slot="label">
          REXX 执行参数
          <a-popover style="cursor: pointer">
            <template slot="content">
              <p>你可以在执行 REXX 脚本的时候传入参数，</p>
              <p>如果存在多个参数，用空格分隔开。</p>
            </template>
            <a-icon type="question-circle" />
          </a-popover>
        </span>
        <a-input
          placeholder="请输入参数（如果有的话）"
          v-decorator="['param']"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="isLoading">
          提交
        </a-button>
      </a-form-item>
    </a-form>
    <pre v-if="result">{{ result }}</pre>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "REXX",
  data() {
    return {
      form: this.$form.createForm(this),
      isLoading: false,
      result: null
    };
  },

  methods: {
    // todo: refine backend code and trim in frontend
    // create file
    async createDS() {
      const { getFieldValue } = this.form;
      const rexxName = getFieldValue("name");
      try {
        if (rexxName.indexOf("(") !== -1) {
          const response = await Axios.post("/api/createDatasetP", {
            rexxName
          });
          if (response.status === 200) {
            this.$message.success("创建数据集成功").then();
          }
        } else {
          const response = await Axios.post("/api/createDataset", {
            rexxName
          });
          if (response.status === 200) {
            this.$message.success("创建数据集成功").then();
          }
        }
      } catch (e) {
        this.$message.error("发生错误：" + e.message).then();
      }
    },
    // write file to sequential or partitioned data set
    async writeDS() {
      const { getFieldValue } = this.form;
      const rexxName = getFieldValue("name");
      const rexxCode = getFieldValue("code");
      try {
        const response = await Axios.post("/api/writeDataset", {
          rexxName,
          rexxCode
        });
        if (response.status === 200) {
          this.$message.success("写入数据集成功").then();
        }
      } catch (e) {
        this.$message.error("发生错误：" + e.message).then();
      }
    },
    // run a rexx script
    async runRexx() {
      const { getFieldValue } = this.form;
      const rexxName = getFieldValue("name");
      const param = getFieldValue("param");
      try {
        if (rexxName.indexOf("(") !== -1) {
          const arr = rexxName.trim().split(/[()]/g);
          const response = await Axios.post("/api/rexx", {
            libName: arr[0],
            rexxName: arr[1],
            rexxPut: param
          });
          if (response.status === 200) {
            this.result = response.data;
            this.$message.success("运行成功").then();
          }
        } else {
          const response = await Axios.post("/api/rexx2", {
            rexxName: rexxName.trim(),
            rexxPut: param
          });
          if (response.status === 200) {
            this.result = response.data;
            this.$message.success("运行成功").then();
          }
        }
      } catch (e) {
        this.$message.error("发生错误：" + e.message).then();
      }
    },
    async handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields }
      } = this;
      validateFields(async errors => {
        if (errors) return;
        this.isLoading = true;
        try {
          await this.createDS();
          await this.writeDS();
          await this.runRexx();
        } catch (error) {
          this.$message.error("REXX 执行失败：" + error.message).then();
        } finally {
          this.isLoading = false;
        }
      });
    }
  }
};
</script>

<style scoped></style>
