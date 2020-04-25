<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
  name: "app",
  data() {
    return {
      zh_CN
    };
  }
};
</script>

<style>
#app {
  min-height: 100vh;
}
pre {
  background: #eee;
  padding: 1em;
  margin: 1em 0 !important;

  border: 1px solid #ddd;
}
.ant-input {
  font-family: monospace !important;
}
</style>
