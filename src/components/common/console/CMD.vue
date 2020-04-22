<template>
  <div>
    <a-form :form="form" layout="vertical" @submit="handleSubmit">
      <a-form-item>
        <span slot="label">
          TSO 命令
          <a-popover style="cursor: pointer">
            <template slot="content">
              <p>你可以在上面的框内填写 TSO 命令，类似于 P.6 的功能，</p>
              <p>并且你可以输入多个命令，用 ; 分割。</p>
              <p>命令长度不限，支持换行。</p>
              只要不是写得太迷惑应该都 🆗 的。
            </template>
            <a-icon type="question-circle" />
          </a-popover>
        </span>
        <a-textarea
          :autosize="{ minRows: 5 }"
          placeholder="请输入命令"
          v-decorator="[
            'cmd',
            {
              rules: [{ required: true, message: '请输入命令' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="isLoading">
          提交
        </a-button>
      </a-form-item>
    </a-form>
    <pre v-show="result">{{ result }}</pre>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      isLoading: false,
      result: ""
    };
  },

  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields }
      } = this;

      validateFields(async (errors, values) => {
        if (errors) return;
        this.isLoading = true;
        try {
          const response = await Axios.post("/api/cmd", {
            cmd: values.cmd
          });
          if (response.status === 200) {
            this.result = response.data;
            this.$message.success("命令执行成功").then();
          } else {
            this.$message.warn("命令已提交，但服务器响应超时了 😥").then();
          }
        } catch (error) {
          this.$message.error("发生错误：" + error.message).then();
        } finally {
          this.isLoading = false;
        }
      });
    }
  }
};
</script>
