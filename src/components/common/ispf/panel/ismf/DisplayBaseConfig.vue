<template>
  <div class="master-panel">
    <h3 class="panel-title">CDS BASE DISPLAY</h3>
    <div class="panel-content">
      <a-row>
        <a-col :span="10" class="panel-name">CDS Name : </a-col>
        <a-col :span="14" class="panel-desc">ST000.SMS.SCDS</a-col>
      </a-row>
      <a-row>
        <a-col :span="10" class="panel-name">CDS Status : </a-col>
        <a-col :span="14" class="panel-desc">INVALid</a-col>
      </a-row>
      <a-row>
        <a-col :span="10" class="panel-name">Description : </a-col>
        <a-col :span="14" class="panel-desc"> jdapoijfqpefjqpoeirqe</a-col>
      </a-row>
      <a-row>
        <a-col :span="10" class="panel-name">Default Management Class : </a-col>
        <a-col :span="14" class="panel-desc">ST000.SMS.SCDS</a-col>
      </a-row>
      <a-row>
        <a-col :span="10" class="panel-name">Default Unit : </a-col>
        <a-col :span="14" class="panel-desc">6666</a-col>
      </a-row>
      <a-row>
        <a-col :span="10" class="panel-name">Default Device Geometry</a-col>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="9" class="panel-name">Bytes/track : </a-col>
        <a-col :span="14" class="panel-desc">56664</a-col>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="9" class="panel-name"
          >Tracks/cylinder :
        </a-col>
        <a-col :span="14" class="panel-desc">INVALid</a-col>
      </a-row>
      <a-row>
        <a-col :span="10" class="panel-name">DS Separation Profile : </a-col>
        <a-col :span="14" class="panel-desc">st000.dataset</a-col>
      </a-row>
      <a-row>
        <a-col :span="10" class="panel-name">System : </a-col>
        <a-col :span="14" class="panel-desc">by01</a-col>
      </a-row>
      <a-row>
        <a-col :span="10" class="panel-name">Sysgrp : </a-col>
        <a-col :span="14" class="panel-desc">grpudjqls</a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayBaseConfig"
};
</script>

<style scoped></style>
