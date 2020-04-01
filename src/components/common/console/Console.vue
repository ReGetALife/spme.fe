<template>
  <a-tabs type="card">
    <a-tab-pane tab="命令行" key="cmd"><CMD /></a-tab-pane>
    <a-tab-pane tab="JCL" key="jcl"><JCL /></a-tab-pane>
  </a-tabs>
</template>

<script>
import CMD from "./CMD";
import JCL from "./JCL";
// remove warning of async-validator used by a-form
// ref: https://github.com/yiminghe/async-validator#how-to-avoid-warning
import Schema from "async-validator";
Schema.warning = function() {};

export default {
  components: {
    CMD,
    JCL
  },
  props: {},
  data() {
    return {};
  },

  methods: {}
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
