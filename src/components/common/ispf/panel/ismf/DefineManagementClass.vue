<template>
  <div class="master-panel">
    <a-spin size="large" :spinning="isLoading">
      <a-icon slot="indicator" type="loading-3-quarters" :spin="true" />
      <h3 class="panel-title">MANAGEMENT CLASS DEFINE</h3>
      <div class="panel-content">
        <a-row>
          <a-col :span="10" class="panel-name">SCDS Name :</a-col>
          <a-col :span="14" class="panel-name">
            {{ this.$store.state.ispf.cdsName }}
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="10" class="panel-name">Management Class Name :</a-col>
          <a-col :span="14" class="panel-name">
            {{ this.$store.state.ispf.construct }}
          </a-col>
        </a-row>
        <a-row class="panel-name">To DEFINE Management Class, Specify:</a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Description: "
            v-model="descr"
          ></a-input>
        </a-row>
        <a-row class="panel-cmd">Expiration Attributes</a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Expire after Days Non-usage: "
            placeholder="1 to 93000 or NOLIMIT"
            v-model="expnouse"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Expire after Date/Days: "
            placeholder="0 to 93000, yyyy/mm/dd or NOLIMIT"
            v-model="expdtdy"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Retention Limit: "
            placeholder="1 to 93000 or NOLIMIT"
            v-model="retnlim"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Partial Release: "
            placeholder="Y, C, YI, CI or N"
            v-model="partrel"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Command >"
            placeholder="Press enter to submit"
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
  name: "DefineManagementClass",
  data() {
    return {
      descr: "",
      expnouse: "",
      expdtdy: "",
      retnlim: "",
      partrel: "",
      isLoading: false
    };
  },
  methods: {
    onEnter() {
      const params = {
        scds: this.$store.state.ispf.cdsName,
        mgmtclas: this.$store.state.ispf.construct,
        descr: this.descr.trim(),
        expnouse: this.expnouse.trim(),
        expdtdy: this.expdtdy.trim(),
        retnlim: this.retnlim.trim(),
        partrel: this.partrel.trim()
      };
      this.isLoading = true;
      Axios.post("/api/sms/management-class", params)
        .then(res => {
          this.showResult(res.data);
        })
        .catch(e => {
          this.$message.error("发生错误：" + e.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    showResult(result) {
      if (result.length > 0) {
        const h = this.$createElement;
        this.$info({
          title: `DEFINE 结果`,
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
