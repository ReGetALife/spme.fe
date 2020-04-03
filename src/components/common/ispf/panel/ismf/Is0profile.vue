<template>
  <div class="master-panel">
    <h3 class="panel-title">ISMF PROFILE OPTION MENU</h3>

    <a-input
      class="panel-option"
      addonBefore="Select one of the following options and Press Enter: "
      @pressEnter="onEnter"
      v-focus
    ></a-input>

    <div class="panel-content">
      <a-row v-for="option in options" :key="option.cmd">
        <a-col class="panel-cmd" :offset="1" :span="1">{{ option.cmd }}</a-col>
        <a-col class="panel-desc" :span="21">{{ option.desc }}</a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { cmd: 0, desc: "User Mode Selection" },

        { cmd: 1, desc: "Logging and Abend Control" },

        { cmd: 2, desc: "ISMF Job Statement" },

        { cmd: 3, desc: "DFSMSdss Execute Statement" },

        { cmd: 4, desc: "ICKDSF Execute Statement" },

        { cmd: 5, desc: "Data Set Print Execute Statement" },

        { cmd: 6, desc: "IDCAMS Execute Statement" },

        { cmd: "X", desc: "Exit" }
      ]
    };
  },
  methods: {
    onEnter(e) {
      if (e.target.value) {
        const panel = `is_0_${e.target.value.trim()}`
          .replace(/\./g, "_")
          .toLowerCase();
        this.$store.commit("ispf/SET_PANEL", panel);
      }
    }
  }
};
</script>

<style scoped></style>
