<template>
  <div class="master-panel">
    <h3 class="panel-title">STORAGE GROUP APPLICATION SELECTION</h3>
    <a-spin size="large" :spinning="isLoading">
    <div class="panel-content">
      <a-row class="panel-name"
        >To perform Storage Group Operations, Specify:
      </a-row>
      <a-row>
        <a-col :offset="1">
          <a-input
            v-focus
            class="panel-option"
            addonBefore="CDS Name"
            v-model="cdsName"
          ></a-input>
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="1">
          <a-input
            class="panel-option"
            addonBefore="Storage Group Name"
            v-model="construct"
          ></a-input>
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="1">
          <a-input
            class="panel-option"
            addonBefore="Storage Group Type"
            value="POOL"
            disabled
          ></a-input>
        </a-col>
      </a-row>
      <a-row>
        <a-input
          class="panel-option"
          addonBefore="Select one of the following options  :"
          placeholder=" "
          @pressEnter="onEnter"
        ></a-input>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">1</a-col>
        <a-col :span="5" class="panel-name">List</a-col>
        <a-col :span="17" class="panel-desc"
          >- Generate a list of Storage Groups
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">2</a-col>
        <a-col :span="5" class="panel-name">Display</a-col>
        <a-col :span="17" class="panel-desc">- Display a Storage Group</a-col>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">3</a-col>
        <a-col :span="5" class="panel-name">Define</a-col>
        <a-col :span="17" class="panel-desc">- Define a Storage Group</a-col>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">4</a-col>
        <a-col :span="5" class="panel-name">Alter</a-col>
        <a-col :span="17" class="panel-desc">- Alter a Storage Group</a-col>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">5</a-col>
        <a-col :span="5" class="panel-name">Volume</a-col>
        <a-col :span="17" class="panel-desc"
          >- Display, Define, Alter or Delete Volume Information
        </a-col>
      </a-row>
    </div>
    </a-spin>
  </div>
</template>

<script>
  import Axios from "axios";
export default {
  data() {
    return {
      cdsName: "",
      construct: "",
      isLoading: false
    };
  },
  methods: {
    onEnter(e) {
      var _this = this;
      if (e.target.value) {
        var showResult = function(result) {
          if (result.length > 0) {
            const h = _this.$createElement;
            _this.$info({
              title: `结果`,
              width: 800,
              content: h("div", {}, [h("pre", result)]),
              onOk() {
                // do nothing
              }
            });
          }
        }
        if (e.target.value === "1") {
          const params = {
            scds: this.cdsName.trim(),
            storgrp: this.construct.trim()
          };
          _this.isLoading = true;

          Axios.post("/api/sms/list-storage-group/pool", params)
                  .then(res => {
                    showResult(res.data);
                  })
                  .catch(e => {
                    this.$message.error("发生错误：" + e.message);
                  })
                  .finally(() => {
                    _this.isLoading = false;
                  });
        }
        else if (e.target.value === "2") {
          const params = {
            scds: this.cdsName.trim(),
            storgrp: this.construct.trim()
          };


          _this.isLoading = true;

          Axios.post("/api/sms/display-storage-group/pool", params)
                  .then(res => {
                    showResult(res.data);
                  })
                  .catch(e => {
                    this.$message.error("发生错误：" + e.message);
                  })
                  .finally(() => {
                    _this.isLoading = false;
                  });
        }
        else{
          this.$store.commit(
                "ispf/SET_CDS_NAME",
                this.cdsName.trim().toUpperCase()
        );
          this.$store.commit(
                  "ispf/SET_CONSTRUCT",
                  this.construct.trim().toUpperCase()
          );
          let panel;
          if (e.target.value.trim() === "5") {
            panel = "is_6_5";
          } else {
            panel = `is_6_${e.target.value.trim()}_pool`
                    .replace(/\./g, "_")
                    .toLowerCase();
          }
          this.$store.commit("ispf/SET_PANEL", panel);
        }

      }
    }
  }
};
</script>

<style scoped></style>
