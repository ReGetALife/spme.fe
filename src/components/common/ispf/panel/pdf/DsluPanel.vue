<template>
  <div class="master-panel">
    <h3 class="panel-title">Data Set List Utility</h3>

    <div class="panel-content">
      <div class="panel-name">
        <a-row>
          <a-col :span="12">blank: Display data set list</a-col>
          <a-col :span="12">P: Print data set list</a-col>
        </a-row>
        <a-row>
          <a-col :span="12">V: Display VTOC information</a-col>
          <a-col :span="12">PV: Print VTOC information</a-col>
        </a-row>
      </div>

      <br />

      <a-row class="panel-desc"
        >Enter one or both of the parameters below:</a-row
      >
      <!-- <a-card title="Enter one or both of the parameters below"> -->
      <a-form-item
        class="panel-option"
        v-focus
        label="Dsname Level: "
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input v-model="dsname" />
      </a-form-item>
      <a-form-item
        class="panel-option"
        label="Volume Serial: "
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input v-model="volumeName" />
      </a-form-item>
      <!-- </a-card> -->

      <div class="panel-card">
        <a-row class="panel-desc">Data set list options:</a-row>
        <!-- <a-card title="Data set list options" class="panel-card"> -->
        <a-form-item
          class="panel-option"
          label="Initial View"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-radio-group v-model="value">
            <a-radio-button value="1">Volume</a-radio-button>
            <a-radio-button value="2">Space</a-radio-button>
            <a-radio-button value="3">Attrib</a-radio-button>
            <a-radio-button value="4">Total</a-radio-button>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          class="panel-option"
          label="Select option"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-checkbox-group :options="selectOptions" v-model="checkedList" />
        </a-form-item>
      </div>
      <!-- </a-card> -->
      <a-input
        class="panel-option"
        addonBefore="Option >"
        @keyup.enter="Option"
        placeholder=""
        v-model="option"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "dsu-panel",
  data() {
    return {
      dsname: "",
      volumeName: "",
      option: "",
      value: "1",
      selectOptions: [
        "Confirm Data Set Delete",
        "Confirm Member Delete",
        "Include Additional Qualifiers",
        "Display Catalog Name",
        "Display Total Tracks",
        "Prefix Dsname Level"
      ],
      checkedList: [
        "Confirm Data Set Delete",
        "Confirm Member Delete",
        "Include Additional Qualifiers",
        "Display Catalog Name"
      ]
    };
  },
  methods: {
    Option() {
      if (this.dsname.length == 0) this.$message.error("Enter required field");
      else {
        this.$router.push({
          path: "dslist",
          query: {
            dsn: this.dsname.toUpperCase()
          }
        });
      }
    }
  }
};
</script>

<style>
.panel-card {
  background: rgba(0, 0, 0, 0.5);
}

.panel-card .ant-radio-button-wrapper {
  color: white;
  background: black;
}
.panel-card .ant-checkbox-wrapper {
  color: white;
}
</style>
