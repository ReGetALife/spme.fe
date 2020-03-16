<template>
  <div class="lab-container">
    <div class="left">
      <slot name="left" />
    </div>
    <div class="divider"></div>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lab-container {
  display: flex;
  justify-content: space-between;
  position: relative;

  height: 100%;

  .left,
  .right {
    width: 49%;
    overflow: auto;
  }

  .divider {
    position: relative;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #ddd;
  }
}
</style>
