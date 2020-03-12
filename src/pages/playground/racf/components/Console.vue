<template>
  <a-tabs type="card">
    <a-tab-pane tab="命令行" key="command"><Command /></a-tab-pane>
    <a-tab-pane tab="JCL" key="jcl"><JCL /></a-tab-pane>
  </a-tabs>
</template>

<script>
import Command from "./Command";
import JCL from "./JCL";

export default {
  components: {
    Command,
    JCL
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    result: {
      type: String
      // default: "这里显示返回结果 \n\nbalbalbl\nbabdba"
    }
  },
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.$emit("submit", this.form.getFieldsValue());
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
