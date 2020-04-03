<template>
  <div class="master-panel">
    <h3 class="panel-title">DATA SET SELECTION ENTRY PANEL</h3>

    <div class="panel-content">
      <a-row>
        <a-col class="panel-name" :span="24"
          >For a Data Set List, Select Source of Generated List . . 2 (1 or
          2)</a-col
        >
      </a-row>
      <a-row :gutter="16" class="panel-desc">
        <a-col :span="1" :offset="1">1</a-col>
        <a-col :span="9">Generate from a Saved List List Name . . .</a-col>
        <a-col :span="9">Query Name To Save or Retrieve . . .</a-col>
      </a-row>

      <a-row class="panel-desc">
        <a-col :span="1" :offset="1">2</a-col>
        <a-col :span="22">Generate a new list from criteria below</a-col>
      </a-row>

      <a-row>
        <a-col :span="22" :offset="2">
          <a-input
            v-focus
            class="panel-option"
            addonBefore="Data Set Name"
            @pressEnter="datasetApp"
            v-model="dataSetName"
          />
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="22" :offset="2">
          <a-input
            class="panel-option"
            addonBefore="Specify Source of the new list"
            placeholder="(1 - VTOC, 2 - Catalog)"
            @pressEnter="datasetApp"
            v-model="source"
          />
        </a-col>
      </a-row>

      <a-row class="panel-desc">
        <a-col :span="1" :offset="2">1</a-col>
        <a-col :span="21">Generate list from VTOC</a-col>
      </a-row>

      <a-row>
        <a-col :span="21" :offset="3">
          <a-input
            class="panel-option"
            addonBefore="Volume Serial Number"
            placeholder="(fully or partially specified)"
            @pressEnter="datasetApp"
            v-model="volume"
          />
        </a-col>
      </a-row>

      <a-row class="panel-desc">
        <a-col :span="21" :offset="3">Storage Group Name . . .</a-col>
      </a-row>

      <a-row class="panel-desc">
        <a-col :span="1" :offset="2">2</a-col>
        <a-col :span="21">Generate list from Catalog</a-col>
      </a-row>

      <a-row class="panel-desc">
        <a-col :span="21" :offset="3">Catalog Name . . .</a-col>
      </a-row>
      <a-row class="panel-desc">
        <a-col :span="21" :offset="3">Volume Serial Number . . .</a-col>
      </a-row>
      <a-row class="panel-desc">
        <a-col :span="21" :offset="3">
          <a-input
            class="panel-option"
            addonBefore="Acquire Data from Volume"
            placeholder="Y or N"
            @pressEnter="datasetApp"
            v-model="acquireVolume"
          />
        </a-col>
      </a-row>
      <a-row class="panel-desc">
        <a-col :span="21" :offset="3"
          >Acquire Data if DFSMShsm Migrated . . . N (Y or N)</a-col
        >
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "is1",
  data() {
    return {
      dataSetName: "",
      source: "",
      volume: "",
      acquireVolume: "N"
    };
  },
  methods: {
    datasetApp() {
      // console.log({
      //   dataSetName: this.dataSetName,
      //   source: this.source,
      //   volume: this.volume,
      //   acquireVolume: this.acquireVolume
      // });
    }
  }
};
</script>
