<template>
  <div class="master-panel">
    <a-spin size="large" :spinning="isLoading">
      <a-icon slot="indicator" type="loading-3-quarters" :spin="true" />
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
              placeholder="1 to 44 Character Data Set Name"
              v-model="scds"
            ></a-input>
          </a-col>
          <br />
          <a-col>
            <a-input
              class="panel-option"
              addonBefore="ACS Source Data Set"
              placeholder="1 to 44 Character Data Set Name"
              v-model="acssrc"
            ></a-input>
          </a-col>
          <br />
          <a-col>
            <a-input
              class="panel-option"
              addonBefore="ACS Source Member"
              placeholder="1 to 8 characters"
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
  name: "ismf-acs-translate",
  activated() {
    this.scds = this.$store.state.ispf.cdsName;
  },
  data() {
    return {
      scds: this.$store.state.ispf.cdsName,
      acssrc: "",
      member: "",
      listname: "",
      isLoading: false
    };
  },

  methods: {
    onEnter() {
      if (
        this.scds.trim().length === 0 ||
        this.acssrc.trim().length === 0 ||
        this.member.trim().length === 0 ||
        this.listname.trim().length === 0
      )
        this.$message.warn("Enter required field");
      else {
        this.isLoading = true;
        const params = {
          scds: this.scds.trim(),
          acssrc: this.acssrc.trim().toUpperCase(),
          member: this.member.trim().toUpperCase(),
          listname: this.listname.trim().toUpperCase()
        };
        Axios.post("/api/sms/acs/translate", params)
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
          title: `TRANSLATE 结果`,
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
