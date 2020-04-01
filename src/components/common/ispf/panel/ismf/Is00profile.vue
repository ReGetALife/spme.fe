<template>
  <div class="master-panel">
    <h3 class="panel-title">USER MODE ENTRY PANEL</h3>
    <div class="panel-content">
      <a-row class="panel-name">
        Specify the following:
      </a-row>
      <a-row>
        <a-input
          class="panel-option"
          v-focus
          addonBefore="User Mode: "
        ></a-input>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">1</a-col>
        <a-col :span="21" class="panel-desc">For an End User (EU)</a-col>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">2</a-col>
        <a-col :span="21" class="panel-desc"
          >For a Storage Administrator (SA)</a-col
        >
      </a-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
