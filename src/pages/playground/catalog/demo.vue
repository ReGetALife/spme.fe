<template>
  <div>
    <h1>RACF Demo</h1>
    <a-form :form="form" layout="inline" @submit="handleSubmit">
      <a-form-item label="命令">
        <a-input v-decorator="['code']" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="isLoading">
          提交
        </a-button>
      </a-form-item>
    </a-form>
    <pre>{{ result }}</pre>
  </div>
</template>

<script>
import Axios from "axios";
import { Modal } from "ant-design-vue";
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      isLoading: false,
      result: ""
    };
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.execute(this.form.getFieldsValue().code);
    },

    async execute(command) {
      if (this.isLoading) return;
      this.isLoading = true;
      console.log(command);
      try {
        const response = await Axios.put("/api/racf", command, {
          headers: { "Content-Type": "text/plain" }
        });
        switch (response.status) {
          case 200:
            this.result = response.data;
            break;
          case 202:
            Modal.error({
              title: "执行失败",
              content: "命令超时",
              centered: true
            });
            break;
          case 401:
            Modal.error({
              title: "执行失败",
              content: "未登录",
              centered: true
            });
        }
      } catch (error) {
        Modal.error({
          title: "执行失败",
          content: error.message,
          centered: true
        });
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style>
pre {
  background: #eee;
  padding: 1em;
  margin: 1em 0 !important;

  border: 1px solid #ddd;
}
</style>
