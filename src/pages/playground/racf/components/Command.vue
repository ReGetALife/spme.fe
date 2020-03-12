<template>
  <div>
    <a-form :form="form" layout="vertical" @submit="handleSubmit">
      <a-form-item>
        <a-textarea
          placeholder="请输入命令"
          v-decorator="[
            'command',
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
          const response = await Axios.post("/api/racf/inputCommand", values);
          this.result = response.data.sysprint;
        } catch (error) {
          this.$message.error("服务器错误");
        } finally {
          this.isLoading = false;
        }
      });
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
