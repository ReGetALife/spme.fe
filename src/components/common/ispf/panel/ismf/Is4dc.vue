<template>
  <div class="master-panel">
    <h3 class="panel-title">DATA CLASS APPLICATION SELECTION</h3>
    <div class="panel-content">
      <a-row class="panel-name"
        >To perform Data Class Operations, Specify:</a-row
      >
      <a-row>
        <a-col :offset="1">
          <a-input
            v-focus
            class="panel-option"
            addonBefore="CDS Name"
          ></a-input>
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="1">
          <a-input
            class="panel-option"
            addonBefore="Data Class Name"
            v-model="dcName"
          ></a-input>
        </a-col>
      </a-row>
      <a-row>
        <a-input
          class="panel-option"
          addonBefore="Select one of the following options: "
          @pressEnter="define"
        ></a-input>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">1</a-col>
        <a-col :span="5" class="panel-name">List</a-col>
        <a-col :span="17" class="panel-desc"
          >- Generate a list of Data Classes</a-col
        >
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">2</a-col>
        <a-col :span="5" class="panel-name">Display</a-col>
        <a-col :span="17" class="panel-desc">- Display a Data Class</a-col>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">3</a-col>
        <a-col :span="5" class="panel-name">Define</a-col>
        <a-col :span="17" class="panel-desc">- Define a Data Class</a-col>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">4</a-col>
        <a-col :span="5" class="panel-name">Alter</a-col>
        <a-col :span="17" class="panel-desc">- Alter a Data Class</a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dcName: ""
    };
  },
  methods: {
    define() {
      if (this.dcName.toUpperCase() === "DCSDS") {
        axios
          .post(`/api/sms/ismf/5/1`)
          .then(() => this.$message.success("创建成功"))
          .catch(err => this.$message.error(err.message));
      } else if (this.dcName.toUpperCase() === "DCPDS") {
        axios
          .post(`/api/sms/ismf/5/2`)
          .then(() => this.$message.success("创建成功"))
          .catch(err => this.$message.error(err.message));
      } else if (this.dcName.toUpperCase() === "DCKSDS") {
        axios
          .post(`/api/sms/ismf/5/3`)
          .then(() => this.$message.success("创建成功"))
          .catch(err => this.$message.error(err.message));
      }
    }
  }
};
</script>

<style scoped></style>
