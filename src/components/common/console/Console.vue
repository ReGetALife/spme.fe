<template>
  <a-tabs type="card" :defaultActiveKey="defaultTab">
    <a-tab-pane tab="命令行" key="cmd"><CMD /></a-tab-pane>
    <a-tab-pane tab="JCL" key="jcl"><JCL /></a-tab-pane>
    <a-tab-pane tab="REXX" key="rexx"><REXX /></a-tab-pane>
  </a-tabs>
</template>

<script>
import CMD from "./CMD";
import JCL from "./JCL";
import REXX from "./REXX";
// remove warning of async-validator used by a-form
// ref: https://github.com/yiminghe/async-validator#how-to-avoid-warning
import Schema from "async-validator";
Schema.warning = function() {};

export default {
  components: {
    CMD,
    JCL,
    REXX
  },
  props: {
    defaultTab: {
      type: String,
      default: "cmd"
    }
  },
  data() {
    return {};
  },

  methods: {}
};
</script>

<style>
.ant-tabs-tab {
  min-width: 80px;
  text-align: center;
}
</style>
