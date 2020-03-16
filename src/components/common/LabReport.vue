<template>
  <div>
    <h2>实验报告：{{ name }}</h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["name"]
};
</script>
