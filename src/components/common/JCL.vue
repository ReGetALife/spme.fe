<template>
  <div>
    <a-form :form="form" layout="vertical" @submit="handleSubmit">
      <a-form-item>
        <a-textarea
          :autosize="{ minRows: 5 }"
          placeholder="请输入JCL代码"
          v-decorator="[
            'command',
            {
              rules: [{ required: true, message: '请输入JCL代码' }]
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
    <a-collapse :bordered="false" v-if="result">
      <a-collapse-panel header="JESMSGLG" key="1">
        <pre v-if="result.jesmsglg">{{ result.jesmsglg }}</pre>
      </a-collapse-panel>
      <a-collapse-panel header="JESJCL" key="2">
        <pre v-if="result.jesjcl">{{ result.jesjcl }}</pre>
      </a-collapse-panel>
      <a-collapse-panel header="JESYSMSG" key="3">
        <pre v-if="result.jesysmsg">{{ result.jesysmsg }}</pre>
      </a-collapse-panel>
      <a-collapse-panel header="SYSTSPRT" key="4">
        <pre v-if="result.sysprint">{{ result.sysprint }}</pre>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      isLoading: false,
      result: null
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
          const response = await Axios.post("/api/racf/JCLjob", values);
          this.result = response.data;
        } catch (error) {
          this.$message.error("JCL 执行失败");
        } finally {
          this.isLoading = false;
        }
      });
    }
  }
};
</script>
