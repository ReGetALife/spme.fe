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
            @keyup.enter="Option"
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
export default {
  name: "ismf-acs-translate",
  data() {
    return {
      scdsName: this.$route.query.cdsName,
      dataSet: "",
      sourceMem: "",
      listDS: ""
    }; //this.$route.query.dsn
  },

  methods: {
    Option() {
      if (
        this.scdsName.length == 0 ||
        this.dataSet.length == 0 ||
        this.sourceMem.length == 0 ||
        this.listDS.length == 0
      )
        this.$message.error("Enter required field");
      else {
        if (this.sourceMem.toUpperCase() == "SC") {
          this.$http
            .post("/api/sms/ismf/11/1")
            .then(res => {
              this.$message.success("成功");
              console.log("'/api/sms/ismf/11/1' Success: ", res);
            })
            .catch(err => {
              console.log("Get '/api/sms/ismf/11/1' Error: ", err);
            });
        } else if (this.sourceMem.toUpperCase() == "DC") {
          this.$http
            .post("/api/sms/ismf/11/2")
            .then(res => {
              this.$message.success("成功");
              console.log("'/api/sms/ismf/11/2' Success: ", res);
            })
            .catch(err => {
              console.log("Get '/api/sms/ismf/11/2' Error: ", err);
            });
        } else if (this.sourceMem.toUpperCase() == "MC") {
          this.$http
            .post("/api/sms/ismf/11/3")
            .then(res => {
              this.$message.success("成功");
              console.log("'/api/sms/ismf/11/3' Success: ", res);
            })
            .catch(err => {
              console.log("Get '/api/sms/ismf/11/3' Error: ", err);
            });
        } else if (this.sourceMem.toUpperCase() == "SG") {
          this.$http
            .post("/api/sms/ismf/11/4")
            .then(res => {
              this.$message.success("成功");
              console.log("'/api/sms/ismf/11/4' Success: ", res);
            })
            .catch(err => {
              console.log("Get '/api/sms/ismf/11/4' Error: ", err);
            });
        }
      }
    }
  }
};
</script>

<style scoped></style>
