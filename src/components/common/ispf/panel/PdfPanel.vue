<template>
  <div class="master-panel">
    <h3 class="panel-title">ISPF Primary Option Menu</h3>
    <a-input
      v-focus
      class="panel-option"
      addonBefore="OPTION >"
      @pressEnter="onEnter"
    />

    <div class="panel-content">
      <a-row :gutter="16" v-for="option in options" :key="option.cmd">
        <a-col class="panel-cmd" :span="3">{{ option.cmd }}</a-col>
        <a-col class="panel-name" :span="6">{{ option.name }}</a-col>
        <a-col class="panel-desc" :span="15">{{ option.desc }}</a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "master-panel",
  data() {
    return {
      options: [
        {
          index: 0,
          cmd: "3.2",
          name: "Data Set Utility",
          desc:
            "Allocate, rename, delete, catalog, uncatalog, or display information of an entire data set"
        },
        {
          index: 1,
          cmd: "3.4",
          name: "Data Set List Utility",
          desc:
            "Print or display (to process) list of data set names. Print or display VTOC information"
        }
      ]
    };
  },
  methods: {
    onEnter(e) {
      if (e.target.value) {
        const panel = `p_${e.target.value.trim()}`
          .replace(/\./g, "_")
          .toLowerCase();
        this.$store.commit("ispf/SET_PANEL", panel);
      }
    }
  }
};
</script>

<style></style>
