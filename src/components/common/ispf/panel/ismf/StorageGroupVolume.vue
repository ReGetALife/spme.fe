<template>
  <div class="master-panel">
    <a-spin size="large" :spinning="isLoading">
      <a-icon slot="indicator" type="loading-3-quarters" :spin="true" />
      <h3 class="panel-title">STORAGE GROUP VOLUME SELECTION</h3>
      <div class="panel-content">
        <a-row>
          <a-col :span="10" class="panel-name">CDS Name :</a-col>
          <a-col :span="14" class="panel-name">
            {{ this.$store.state.ispf.cdsName }}
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="10" class="panel-name">Storage Group Name :</a-col>
          <a-col :span="14" class="panel-name">
            {{ this.$store.state.ispf.construct }}
          </a-col>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Select one of the following options  :"
            placeholder="Only support option 2, press enter to submit"
            @pressEnter="onEnter"
          ></a-input>
        </a-row>
        <a-row>
          <a-col :offset="1" :span="1" class="panel-cmd">1</a-col>
          <a-col :span="5" class="panel-name">Display</a-col>
          <a-col :span="17" class="panel-desc"
            >- Display SMS Volume Statuses (Pool & Copy Pool Backup only)
          </a-col>
        </a-row>
        <a-row>
          <a-col :offset="1" :span="1" class="panel-cmd">2</a-col>
          <a-col :span="5" class="panel-name">Define</a-col>
          <a-col :span="17" class="panel-desc"
            >- Add Volumes to Volume Serial Number List</a-col
          >
        </a-row>
        <a-row>
          <a-col :offset="1" :span="1" class="panel-cmd">3</a-col>
          <a-col :span="5" class="panel-name">Alter</a-col>
          <a-col :span="17" class="panel-desc"
            >- Alter Volume Statuses (Pool & Copy Pool Backup only)</a-col
          >
        </a-row>
        <a-row>
          <a-col :offset="1" :span="1" class="panel-cmd">4</a-col>
          <a-col :span="5" class="panel-name">Delete</a-col>
          <a-col :span="17" class="panel-desc"
            >- Delete Volumes from Volume Serial Number List</a-col
          >
        </a-row>
        <a-row class="panel-name"
          >Specify a Single Volume (in Prefix), or Range of Volumes:</a-row
        >
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Prefix: "
            placeholder="Required"
            v-model="vol"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="From: "
            v-model="from"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="To: "
            v-model="to"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Suffix: "
            v-model="suf"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Type: "
            v-model="type"
          ></a-input>
        </a-row>
        <a-row>
          <a-input
            class="panel-option"
            addonBefore="Status: "
            placeholder="ENABLE/NOTCON/DISALL/DISNEW/QUIALL/QUINEW, separated by commas"
            v-model="status"
          ></a-input>
        </a-row>
      </div>
    </a-spin>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "StorageGroupVolume",
  data() {
    return {
      vol: "",
      from: "",
      to: "",
      suf: "",
      type: "",
      status: "",
      isLoading: false
    };
  },
  methods: {
    onEnter(e) {
      const params = {
        scds: this.$store.state.ispf.cdsName,
        sg: this.$store.state.ispf.construct,
        vol: this.vol.trim(),
        from: this.from.trim(),
        to: this.to.trim(),
        suf: this.suf.trim(),
        type: this.type.trim(),
        status: this.status.trim()
      };
      if (e.target.value) {
        if (e.target.value.trim() !== "2") {
          this.$message.warn("该选项暂不支持");
          return;
        }
        this.isLoading = true;
        Axios.post("/api/sms/storage-group/volume", params)
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
