<template>
  <div class="master-panel">
    <h3 class="panel-title">TRANSLATE ACS ROUTINES</h3>
    <div class="panel-content">
      <br />
      <a-row class="panel-name">To Perform ACS Translation, Specify:</a-row>
      <br />
      <a-row>
        <a-col>
          <a-input
            class="panel-option"
            addonBefore="SCDS Name"
            v-model="scdsName"
            @keyup.enter="onEnter"
          ></a-input>
        </a-col>
        <br />
        <a-col>
          <a-input
            class="panel-option"
            addonBefore="ACS Source Data Set"
            v-model="dataSet"
            @keyup.enter="Option"
          ></a-input>
        </a-col>
        <br />
        <a-col>
          <a-input
            class="panel-option"
            addonBefore="ACS Source Member"
            v-model="sourceMem"
            @keyup.enter="Option"
          ></a-input>
        </a-col>
        <br />
        <a-col>
          <a-input
            class="panel-option"
            addonBefore="Listing Data Set"
            v-model="listDS"
            @keyup.enter="Option"
          ></a-input>
        </a-col>
      </a-row>
      <br />
      <a-row class="panel-name">Use ENTER to Perform ACS Translation;</a-row>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "ismf-acs-translate",
  data() {
    return {
      scdsName: this.$store.state.ispf.cdsName,
      dataSet: "",
      sourceMem: "",
      listDS: ""
    };
  },

  methods: {
    onEnter() {
      if (
        this.scdsName.trim().length === 0 ||
        this.dataSet.trim().length === 0 ||
        this.sourceMem.trim().length === 0 ||
        this.listDS.trim().length === 0
      )
        this.$message.error("Enter required field");
      else {
        if (this.sourceMem.trim().toUpperCase() === "SC") {
          Axios.post("/api/sms/ismf/11/1")
            .then(() => {
              this.$message.success("成功");
            })
            .catch(err => {
              this.$message.error("Error: " + err.message);
            });
        } else if (this.sourceMem.trim().toUpperCase() === "DC") {
          Axios.post("/api/sms/ismf/11/2")
            .then(() => {
              this.$message.success("成功");
            })
            .catch(err => {
              this.$message.error("Error: " + err.message);
            });
        } else if (this.sourceMem.trim().toUpperCase() === "MC") {
          Axios.post("/api/sms/ismf/11/3")
            .then(() => {
              this.$message.success("成功");
            })
            .catch(err => {
              this.$message.error("Error: " + err.message);
            });
        } else if (this.sourceMem.trim().toUpperCase() === "SG") {
          Axios.post("/api/sms/ismf/11/4")
            .then(() => {
              this.$message.success("成功");
            })
            .catch(err => {
              this.$message.error("Error: " + err.message);
            });
        }
      }
    }
  }
};
</script>

<style scoped></style>
