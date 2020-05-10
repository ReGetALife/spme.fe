<template>
  <div class="master-panel">
    <a-spin size="large" :spinning="isLoading">
      <a-icon slot="indicator" type="loading-3-quarters" :spin="true" />
      <h3 class="panel-title">STORAGE CLASS DEFINE</h3>
      <div class="panel-content">
        <a-row>
          <a-col :span="10" class="panel-name">SCDS Name :</a-col>
          <a-col :span="14" class="panel-name">
            {{ this.$store.state.ispf.cdsName }}
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="10" class="panel-name">Storage Class Name :</a-col>
          <a-col :span="14" class="panel-name">
            {{ this.$store.state.ispf.construct }}
          </a-col>
        </a-row>
        <a-row class="panel-name">To DEFINE Storage Class, Specify:</a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Description: "
            v-model="descr"
          ></a-input>
        </a-row>
        <a-row class="panel-cmd">Performance Objectives</a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Direct Millisecond Response: "
            placeholder="1 to 999 or blank"
            v-model="dmsresp"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Direct Bias: "
            placeholder="R, W or blank"
            v-model="drtbias"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Sequential Millisecond Response: "
            placeholder="1 to 999 or blank"
            v-model="seqmsres"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Sequential Bias: "
            placeholder="R, W or blank"
            v-model="seqbias"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Initial Access Response Seconds: "
            placeholder="0 to 9999 or blank"
            v-model="iniaress"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Sustained Data Rate (MB/sec): "
            placeholder="0 to 999 or blank"
            v-model="susdtrt"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="OAM Sublevel: "
            placeholder="1, 2 or blank"
            v-model="oamlvl"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Availability: "
            placeholder="C, P ,S or N"
            v-model="avalbty"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Accessibility: "
            placeholder="C, P ,S or N"
            v-model="accsbty"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Backup: "
            placeholder="Y, N or Blank"
            v-model="backup"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Versioning: "
            placeholder="Y, N or Blank"
            v-model="vrsning"
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
  name: "DefineStorageClass",
  data() {
    return {
      descr: "",
      dmsresp: "",
      drtbias: "",
      seqmsres: "",
      seqbias: "",
      iniaress: "",
      susdtrt: "",
      oamlvl: "",
      avalbty: "",
      accsbty: "",
      backup: "",
      vrsning: "",
      isLoading: false
    };
  },
  methods: {
    onEnter() {
      const params = {
        scds: this.$store.state.ispf.cdsName,
        stcname: this.$store.state.ispf.construct,
        descr: this.descr.trim(),
        dmsresp: this.dmsresp.trim(),
        drtbias: this.drtbias.trim(),
        seqmsres: this.seqmsres.trim(),
        seqbias: this.seqbias.trim(),
        iniaress: this.iniaress.trim(),
        susdtrt: this.susdtrt.trim(),
        oamlvl: this.oamlvl.trim(),
        avalbty: this.avalbty.trim(),
        accsbty: this.accsbty.trim(),
        backup: this.backup.trim(),
        vrsning: this.vrsning.trim()
      };
      this.isLoading = true;
      Axios.post("/api/sms/storage-class", params)
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
