<template>
  <div class="master-panel">
    <h3 class="panel-title">CUSTOMPAC MASTER APPLICATION MENU</h3>

    <a-input
      class="panel-option"
      addonBefore="OPTION >"
      placeholder="Only support 'IS', 'P' and their sub option (such as P.3.4)"
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
  props: {},
  data() {
    return {
      option: "",
      options: [
        {
          cmd: "IS",
          name: "ISMF",
          desc: "- Interactive Storage Management Facility"
        },
        {
          cmd: "P",
          name: "PDF",
          desc: "- ISPF/Program Development Facility"
        },
        {
          cmd: "IP",
          name: "IPCS",
          desc: "- ISPF/Program Development Facility"
        },
        {
          cmd: "R",
          name: "RACF",
          desc: "- Resource Access Control Facility"
        },
        {
          cmd: "DI",
          name: "DITTO",
          desc: "- Data Interfile Transfer, Testing and Operations"
        },
        {
          cmd: "SD",
          name: "SDSF",
          desc: "- System Display and Search Facility"
        },
        {
          cmd: "SM",
          name: "SMP/E",
          desc: "- SMP/E Dialogs"
        },
        {
          cmd: "SA",
          name: "SA",
          desc: "- SA/390 Customization Dialog"
        },
        {
          cmd: "IC",
          name: "ICSF",
          desc: "- Integrated Cryptographic Service Facility"
        }
      ]
    };
  },

  methods: {
    onEnter(e) {
      if (e.target.value) {
        const panel = e.target.value
          .trim()
          .replace(/\./g, "_")
          .toLowerCase();
        this.$store.commit("ispf/SET_PANEL", panel);
      }
    }
  }
};
</script>

<style>
.master-panel {
  margin-top: 10px;
  border-radius: 5px;
  padding: 20px 10px 0 10px;
  background-color: rgb(0, 0, 0);
  min-height: 450px;
}
.panel-title {
  color: dodgerblue;
  text-align: center;
}

.panel-option {
  margin: 10px 0;
}

.panel-option .ant-input-group-addon {
  border: none;
  color: rgb(255, 255, 255);
  background-color: rgba(255, 255, 255, 0);
}
.panel-option input {
  color: white;
  outline: none;
  border: none;
  border-radius: 0;
  border-bottom: 1px white solid;
  background-color: rgba(255, 255, 255, 0);
}
.panel-content {
  padding: 20px;
}

.panel-cmd {
  color: white;
}

.panel-name {
  color: cyan;
}

.panel-desc {
  color: greenyellow;
}

.panel-option .ant-form-item-label label {
  color: greenyellow;
}
</style>
