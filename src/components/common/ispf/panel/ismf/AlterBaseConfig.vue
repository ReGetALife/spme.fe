<template>
  <div class="master-panel">
    <h3 class="panel-title">SCDS BASE ALTER</h3>
    <div class="panel-content">
      <a-row>
        <a-col :span="10" class="panel-name">SCDS Name : </a-col>
        <a-col :span="14" class="panel-name">ST000.sms.scds</a-col>
      </a-row>
      <a-row class="panel-name">To ALTER SCDS Base, Specify:</a-row>
      <a-row>
        <a-input
          class="panel-option"
          addonBefore="Description: "
          placeholder="Optional"
        ></a-input>
      </a-row>
      <a-row>
        <a-input
          class="panel-option"
          addonBefore="Default Management Class: "
          placeholder="Optional, 1 to 8 characters"
        ></a-input>
      </a-row>
      <a-row>
        <a-input
          class="panel-option"
          addonBefore="Default Unit: "
          placeholder="Optional, esoteric or generic device name"
        ></a-input>
      </a-row>
      <a-row class="panel-cmd">Default Device Geometry</a-row>
      <a-row>
        <a-col :offset="1">
          <a-input
            class="panel-option"
            addonBefore="Bytes/Track: "
            placeholder="1-999999"
          ></a-input>
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="1">
          <a-input
            class="panel-option"
            addonBefore="Tracks/Cylinder: "
            placeholder="1-999999"
          ></a-input>
        </a-col>
      </a-row>
      <a-row>
        <a-input
          class="panel-option"
          addonBefore="DS Separation Profile: "
          placeholder="Optional, Data Set Name"
        ></a-input>
      </a-row>
      <a-row>
        <a-input
          class="panel-option"
          addonBefore="Specify one of the following options: "
          placeholder="1 Add, 2 Delete, 3 Rename"
        ></a-input>
      </a-row>
      <a-row>
        <a-col :offset="1">
          <a-input
            class="panel-option"
            addonBefore="Specify System Name: "
          ></a-input>
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="1">
          <a-input
            class="panel-option"
            addonBefore="or Sys Group Name: "
          ></a-input>
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="1">
          <a-input
            class="panel-option"
            addonBefore="New System/Sys Group Name: "
            placeholder="For option 3, Rename"
          ></a-input>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlterBaseConfig"
};
</script>

<style scoped></style>
