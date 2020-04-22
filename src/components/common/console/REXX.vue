<template>
  <div>
    <a-form :form="form" layout="vertical" @submit="handleSubmit">
      <a-form-item>
        <span slot="label">
          REXX 代码
          <a-popover style="cursor: pointer">
            <template slot="content">
              <p>
                REXX 代码会暂存在
                {{ this.$store.state.user.username }}.SPME.REXXTEMP.XXXXXXXX
                数据集中。
              </p>
              <p>
                每行不要超过 72 个字符，并且不支持交互操作（如 PARSE PULL)，
              </p>
              但你仍然可以使用 PARSE ARG 来获取传入的参数。
            </template>
            <a-icon type="question-circle" />
          </a-popover>
        </span>
        <a-textarea
          placeholder="请输入 REXX 代码"
          :autosize="{ minRows: 5 }"
          v-decorator="[
            'rexx',
            {
              rules: [
                { required: true, message: '请输入 REXX 代码' },
                { validator: this.rexxValidator }
              ]
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
              如果存在多个参数，用空格分隔开。
            </template>
            <a-icon type="question-circle" />
          </a-popover>
        </span>
        <a-input
          placeholder="请输入参数（如果有的话）"
          v-decorator="['params']"
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
    rexxValidator(rule, value, callback) {
      const lines = (value && value.split("\n")) || [];
      for (const l of lines) {
        if (l.length > 72) {
          callback("每行不能超过 72 个字符 😅");
        }
      }
      // always call callback. ref: https://github.com/ant-design/ant-design/issues/5155
      callback();
    },

    async runRexx() {
      const { getFieldValue } = this.form;
      const rexx = getFieldValue("rexx");
      let params = getFieldValue("params");
      params = (params && params.trim()) || "";
      try {
        const response = await Axios.post("/api/rexx", {
          rexx,
          params
        });
        if (response.status === 200) {
          this.result = response.data;
          this.$message.success("REXX 执行成功").then();
        } else {
          this.$message.warn("REXX 已提交，但服务器响应超时了 😥").then();
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
