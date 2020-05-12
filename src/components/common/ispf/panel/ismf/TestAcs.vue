<template>
  <div class="master-panel">
    <a-spin size="large" :spinning="isLoading">
      <a-icon slot="indicator" type="loading-3-quarters" :spin="true" />
      <h3 class="panel-title">TEST ACS ROUTINES</h3>
      <div class="panel-content">
        <br />
        <a-row class="panel-name">To Perform ACS Test, Specify:</a-row>
        <br />
        <a-row>
          <a-col>
            <a-input
              class="panel-option"
              addonBefore="CDS Name"
              placeholder="1 to 44 Character Data Set Name"
              v-model="scds"
            ></a-input>
          </a-col>
          <a-row class="panel-name">
            ( Please define ACS test cases in real ISMF panel )
          </a-row>
          <a-col>
            <a-input
              class="panel-option"
              addonBefore="ACS Test Library"
              placeholder="1 to 44 Character Data Set Name"
              v-model="testbed"
            ></a-input>
          </a-col>
          <br />
          <a-col>
            <a-input
              class="panel-option"
              addonBefore="ACS Test Member"
              placeholder="fully or partially specified or * for all members"
              v-model="member"
            ></a-input>
          </a-col>
          <br />
          <a-col>
            <a-input
              class="panel-option"
              addonBefore="Listing Data Set"
              placeholder="1 to 44 Character Data Set Name"
              v-model="listname"
            ></a-input>
          </a-col>
          <a-row class="panel-cmd">Select which ACS Routines to Test:</a-row>
          <a-row>
            <a-col :span="6">
              <a-input
                class="panel-option"
                addonBefore="DC"
                placeholder="Y/N"
                v-model="dc"
              ></a-input>
            </a-col>
            <a-col :span="6">
              <a-input
                class="panel-option"
                addonBefore="SC"
                placeholder="Y/N"
                v-model="sc"
              ></a-input>
            </a-col>
            <a-col :span="6">
              <a-input
                class="panel-option"
                addonBefore="MC"
                placeholder="Y/N"
                v-model="mc"
              ></a-input>
            </a-col>
            <a-col :span="6">
              <a-input
                class="panel-option"
                addonBefore="SG"
                placeholder="Y/N"
                v-model="sg"
              ></a-input>
            </a-col>
          </a-row>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Command >"
            placeholder="Use ENTER to Perform ACS Translation"
            @keyup.enter="onEnter"
          />
        </a-row>
      </div>
    </a-spin>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "TestAcs",
  activated() {
    this.scds = this.$store.state.ispf.cdsName;
  },
  data() {
    return {
      scds: this.$store.state.ispf.cdsName,
      testbed: "",
      member: "",
      listname: "",
      dc: "",
      sc: "",
      mc: "",
      sg: "",
      isLoading: false
    };
  },
  methods: {
    onEnter() {
      if (
        this.scds.trim().length === 0 ||
        this.testbed.trim().length === 0 ||
        this.member.trim().length === 0 ||
        this.dc.trim().length === 0 ||
        this.sc.trim().length === 0 ||
        this.mc.trim().length === 0 ||
        this.sg.trim().length === 0 ||
        this.listname.trim().length === 0
      )
        this.$message.warn("Enter required field");
      else {
        this.isLoading = true;
        const params = {
          scds: this.scds.trim(),
          testbed: this.testbed.trim().toUpperCase(),
          member: this.member.trim().toUpperCase(),
          dc: this.dc.trim().toUpperCase(),
          sc: this.sc.trim().toUpperCase(),
          mc: this.mc.trim().toUpperCase(),
          sg: this.sg.trim().toUpperCase(),
          listname: this.listname.trim().toUpperCase()
        };
        Axios.post("/api/sms/acs/test", params)
          .then(res => {
            this.showResult(res.data);
          })
          .catch(e => {
            this.$message.error("发生错误：" + e.message);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    showResult(result) {
      if (result.length > 0) {
        const h = this.$createElement;
        this.$info({
          title: `TEST 结果`,
          width: 800,
          content: h("div", {}, [h("pre", result)]),
          onOk() {
            // do nothing
          }
        });
      }
    }
  }
};
</script>

<style scoped></style>
