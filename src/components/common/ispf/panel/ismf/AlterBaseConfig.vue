<template>
  <div class="master-panel">
    <a-spin size="large" :spinning="isLoading">
      <a-icon slot="indicator" type="loading-3-quarters" :spin="true" />
      <h3 class="panel-title">SCDS BASE Alter</h3>
      <div class="panel-content">
        <a-row>
          <a-col :span="10" class="panel-name">SCDS Name :</a-col>
          <a-col :span="14" class="panel-name">
            {{ this.$store.state.ispf.cdsName }}
          </a-col>
        </a-row>
        <a-row class="panel-name">To Alter SCDS Base, Specify:</a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Description: "
            placeholder="Optional"
            v-model="descr"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Default Management Class: "
            placeholder="Optional, 1 to 8 characters"
            v-model="defmc"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Default Unit: "
            placeholder="Optional, esoteric or generic device name"
            v-model="defunit"
          ></a-input>
        </a-row>
        <a-row class="panel-cmd">Default Device Geometry</a-row>
        <a-row>
          <a-col :offset="1">
            <a-input
              class="panel-option"
              addonBefore="Bytes/Track: "
              placeholder="1-999999"
              v-model="bytptrk"
            ></a-input>
          </a-col>
        </a-row>
        <a-row>
          <a-col :offset="1">
            <a-input
              class="panel-option"
              addonBefore="Tracks/Cylinder: "
              placeholder="1-999999"
              v-model="trkpcyl"
            ></a-input>
          </a-col>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="DS Separation Profile: "
            placeholder="Optional, Data Set Name"
            v-model="dsseppl"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Specify one of the following options: "
            placeholder="1 Add, 2 Delete, 3 Rename"
            v-model="opt"
          ></a-input>
        </a-row>
        <a-row>
          <a-col :offset="1">
            <a-input
              class="panel-option"
              addonBefore="Specify System Name: "
              v-model="sys"
            ></a-input>
          </a-col>
        </a-row>
        <a-row>
          <a-col :offset="1">
            <a-input
              class="panel-option"
              addonBefore="or Sys Group Name: "
              v-model="grp"
            ></a-input>
          </a-col>
        </a-row>
        <a-row>
          <a-col :offset="1">
            <a-input
              class="panel-option"
              addonBefore="New System/Sys Group Name: "
              placeholder="For option 3, Rename"
              v-model="newName"
            ></a-input>
          </a-col>
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
  name: "AlterBaseConfig",
  activated() {
    //this.checkCDS();
  },
  data() {
    return {
      bytptrk: "",
      trkpcyl: "",
      descr: "",
      defmc: "",
      defunit: "",
      dsseppl: "",
      opt: "",
      sys: "",
      grp: "",
      newName: "",
      isLoading: false
    };
  },
  methods: {
    onEnter() {
      let params = {
        scds: this.$store.state.ispf.cdsName,
        bytptrk: this.bytptrk.trim(),
        trkpcyl: this.trkpcyl.trim(),
        descr: this.descr.trim(),
        defmc: this.defmc.trim(),
        defunit: this.defunit.trim(),
        dsseppl: this.dsseppl.trim()
      };
      let rensys, rengrp;
      switch (this.opt.trim()) {
        case "1":
          params = {
            ...params,
            addsys: this.sys.trim(),
            addgrp: this.grp.trim()
          };
          break;
        case "2":
          params = {
            ...params,
            delsys: this.sys.trim(),
            delgrp: this.grp.trim()
          };
          break;
        case "3":
          rensys =
            this.sys.trim() === ""
              ? ""
              : this.sys.trim() + "," + this.newName.trim();
          rengrp =
            this.grp.trim() === ""
              ? ""
              : this.grp.trim() + "," + this.newName.trim();
          params = {
            ...params,
            rensys,
            rengrp
          };
          break;
        default:
          this.$message.warn("请指定选项：1，2 或 3");
          return;
      }
      this.isLoading = true;
      Axios.put(`/api/sms/base-configuration`, params)
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
          title: `ALTER 结果`,
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
