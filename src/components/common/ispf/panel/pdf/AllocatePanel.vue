<template>
  <div class="master-panel">
    <h3 class="panel-title">Allocate New Data Set</h3>
    <!-- <a-card title="Allocate New Data Set"> -->
    <!-- <a-row></a-row> -->
    <div class="panel-content">
      <a-form-item
        class="panel-option"
        :style="{ color: 'white' }"
        label="Data Set Name: "
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        >{{ this.$route.query.dataset }}</a-form-item
      >
      <a-form-item
        class="panel-option"
        label="Volume Serial: "
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-input
          placeholder="Blank for system default volume"
          v-model="volumeName"
        />
      </a-form-item>
      <a-form-item
        class="panel-option"
        label="Space units: "
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-input
          placeholder="BLKS, TRKS, CYLS, KB, MB, BYTES or RECORDS"
          v-model="spaceUnits"
        />
      </a-form-item>
      <a-form-item
        class="panel-option"
        label="Primary quantity: "
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-input placeholder="In above units" v-model="priQuantity" />
      </a-form-item>

      <a-form-item
        class="panel-option"
        label="Secondary quantity: "
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-input placeholder="In above units" v-model="secQuantity" />
      </a-form-item>
      <a-form-item
        class="panel-option"
        label="Directory blocks: "
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-input
          placeholder="Zero for sequential data set"
          v-model="dirBlocks"
        />
      </a-form-item>
      <a-form-item
        class="panel-option"
        label="Record format: "
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-input v-model="recordFormat" />
      </a-form-item>
      <a-form-item
        class="panel-option"
        label="Record length: "
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-input v-model="recordLen" />
      </a-form-item>
      <a-form-item
        class="panel-option"
        label="Block size: "
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-input v-model="blockSize" />
      </a-form-item>

      <a-form-item
        class="panel-option"
        label="Data set name type: "
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-input v-model="dsorg" />
      </a-form-item>

      <a-input
        class="panel-option"
        addonBefore="Command >"
        @keyup.enter="Allocate"
        placeholder
      />
      <!-- </a-card> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "allocate-panel",
  data() {
    return {
      volumeName: "",
      spaceUnits: "",
      priQuantity: "",
      secQuantity: "",
      dirBlocks: "",
      recordFormat: "",
      recordLen: "",
      blockSize: "",
      dsorg: ""
    };
  },
  methods: {
    Allocate() {
      if (this.dsorg.toUpperCase() != "PDS")
        this.$message.error("Please allocate a PDS");
      else {
        axios
          .post("/api/sms/createds", {
            dsname: this.$route.query.dataset.toUpperCase(),
            volser: this.volumeName.toUpperCase(),
            unit: "3390",
            dsorg: "PO",
            alcunit: this.spaceUnits.toUpperCase(),
            dirblk: parseInt(this.dirBlocks),
            avgblk: 500,
            primary: parseInt(this.priQuantity),
            secondary: parseInt(this.secQuantity),
            recfm: this.recordFormat.toUpperCase(),
            blksize: parseInt(this.blockSize),
            lrecl: parseInt(this.recordLen)
          })
          .then(res => {
            // console.log("AllocatePanel post '/sms/createds' 请求成功：", res);

            if (res.data == "") {
              this.$message.success("Data set allocated");
              this.$router.push("data-set-utility");
            } else {
              this.$message.error("Data set not allocated");
            }
          })
          .catch(err => {
            console.log("AllocatePanel post '/sms/createds' 请求错误：", err);
          });
      }
    }
  }
};
</script>
