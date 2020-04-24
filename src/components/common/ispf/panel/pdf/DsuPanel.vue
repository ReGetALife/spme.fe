<template>
  <div class="master-panel">
    <h3 class="panel-title">Data Set Utility</h3>
    <div class="panel-content">
      <div class="panel-name">
        <a-row>
          <a-col :span="12">A Allocate new data set</a-col>
          <a-col :span="12">C Catalog data set</a-col>
        </a-row>
        <a-row>
          <a-col :span="12">R Rename entire data set</a-col>
          <a-col :span="12">U Uncatalog data set</a-col>
        </a-row>
        <a-row>
          <a-col :span="12">D Delete entire data set</a-col>
          <a-col :span="12">S Short data set information</a-col>
        </a-row>
        <a-row>
          <a-col :span="12">blank Data set information</a-col>
          <a-col :span="12">V VSAM Utilities</a-col>
        </a-row>
      </div>

      <br />

      <a-row class="panel-desc"
        >Other Partitioned, Sequential or VSAM Data Set:</a-row
      >
      <a-form-item
        class="panel-option"
        v-focus
        label="Name: "
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 21 }"
      >
        <a-input
          placeholder="Input the name of the data set"
          v-model="dsName"
        />
      </a-form-item>
      <a-form-item
        class="panel-option"
        label="Volume Serial: "
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input
          placeholder="If not cataloged, required for option 'C'"
          v-model="volumeName"
        />
      </a-form-item>
      <a-form-item
        class="panel-option"
        label="Data Set Password: "
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-input placeholder="If password protected" v-model="password" />
      </a-form-item>
      <a-input
        class="panel-option"
        addonBefore="Option >"
        @keyup.enter="onEnter"
        placeholder="Only support 'A' for now"
        v-model="option"
      />
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "dsu-panel",
  data() {
    return {
      option: "",
      dsName: "",
      volumeName: "",
      password: ""
    };
  },
  methods: {
    onEnter() {
      if (!this.dsName) {
        this.$message.warn("请输入 Data Set 的名字");
        return;
      }
      if (this.option) {
        const panel = `p_3_2_${this.option.trim()}`
          .replace(/\./g, "_")
          .toLowerCase();
        this.$store.commit("ispf/SET_DSN", this.dsName.toUpperCase().trim());
        this.$store.commit("ispf/SET_PANEL", panel);
      }
    }
  }
};
</script>
