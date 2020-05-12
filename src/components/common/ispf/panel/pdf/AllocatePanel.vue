<template>
  <div class="master-panel">
    <a-spin size="large" :spinning="isLoading">
      <a-icon slot="indicator" type="loading-3-quarters" :spin="true" />
      <h3 class="panel-title">Allocate New Data Set</h3>
      <div class="panel-content">
        <a-form-item
          class="panel-option"
          :style="{ color: 'white' }"
          label="Data Set Name: "
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          >{{ this.$store.state.ispf.dataSetName }}
        </a-form-item>
        <a-form-item
          class="panel-option"
          label="Management class: "
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            placeholder="Blank for default management class"
            v-model="mgntclass"
          />
        </a-form-item>
        <a-form-item
          class="panel-option"
          label="Storage class: "
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            placeholder="Blank for default storage class"
            v-model="storeclass"
          />
        </a-form-item>
        <a-form-item
          class="panel-option"
          label="Volume Serial: "
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            placeholder="Blank for system default volume"
            v-model="volser"
          />
        </a-form-item>
        <a-form-item
          class="panel-option"
          label="Device type: "
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            placeholder="Generic unit or device address"
            v-model="unit"
          />
        </a-form-item>
        <a-form-item
          class="panel-option"
          label="Data class: "
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            placeholder="Blank for default data class"
            v-model="dataclass"
          />
        </a-form-item>
        <a-form-item
          class="panel-option"
          label="Space units: "
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input placeholder="TRK, CYL" v-model="alcunit" />
        </a-form-item>
        <a-form-item
          class="panel-option"
          label="Primary quantity: "
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input placeholder="In above units" v-model="primary" />
        </a-form-item>

        <a-form-item
          class="panel-option"
          label="Secondary quantity: "
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input placeholder="In above units" v-model="secondary" />
        </a-form-item>
        <a-form-item
          class="panel-option"
          label="Directory blocks: "
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            placeholder="Zero for sequential data set"
            v-model="dirblk"
          />
        </a-form-item>
        <a-form-item
          class="panel-option"
          label="Record format: "
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input v-model="recfm" />
        </a-form-item>
        <a-form-item
          class="panel-option"
          label="Record length: "
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input v-model="lrecl" />
        </a-form-item>
        <a-form-item
          class="panel-option"
          label="Block size: "
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input v-model="blksize" />
        </a-form-item>
        <a-form-item
          class="panel-option"
          label="Data set name type: "
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            placeholder="LIBRARY, HFS, PDS, LARGE, BASIC, EXTREQ, EXTPREF or blank"
            disabled
          />
        </a-form-item>

        <a-input
          class="panel-option"
          addonBefore="Command >"
          @keyup.enter="allocate"
          placeholder
        />
      </div>
    </a-spin>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "allocate-panel",
  data() {
    return {
      volser: "",
      unit: "",
      alcunit: "",
      primary: "",
      secondary: "",
      dirblk: "",
      recfm: "",
      blksize: "",
      lrecl: "",
      storeclass: "",
      mgntclass: "",
      dataclass: "",
      isLoading: false
    };
  },
  methods: {
    allocate() {
      this.isLoading = true;
      let params = {
        dsname: this.$store.state.ispf.dataSetName,
        volser: this.volser,
        unit: this.unit,
        alcunit: this.alcunit,
        primary: parseInt(this.primary),
        secondary: parseInt(this.secondary),
        dirblk: parseInt(this.dirblk),
        recfm: this.recfm,
        blksize: parseInt(this.blksize),
        lrecl: parseInt(this.lrecl),
        storeclass: this.storeclass,
        mgntclass: this.mgntclass,
        dataclass: this.dataclass
      };
      // filter empty properties
      Object.keys(params).forEach(k => !params[k] && delete params[k]);
      axios
        .post("/api/dataset", params)
        .then(() => {
          this.isLoading = false;
          this.$message.success("Data set allocated");
          this.$store.commit("ispf/GO_BACK");
        })
        .catch(e => {
          this.isLoading = false;
          this.$message.error("请求错误：" + e.message);
        });
    }
  }
};
</script>
