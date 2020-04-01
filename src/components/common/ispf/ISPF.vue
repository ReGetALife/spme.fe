<template>
  <div>
    <h2>控制台</h2>
    <a-button icon="rollback" @click="goBack">F3</a-button>
    <component :is="currentPanel"></component>
  </div>
</template>

<script>
import master from "@/components/common/ispf/panel/MasterPanel";
import is from "@/components/common/ispf/panel/IsmfPanel";
import is0 from "@/components/common/ispf/panel/ismf/Is0profile";
import is1 from "@/components/common/ispf/panel/ismf/Is1dataSet";
import is2 from "@/components/common/ispf/panel/ismf/Is2volume";
import is3 from "@/components/common/ispf/panel/ismf/Is3class";
import is4 from "@/components/common/ispf/panel/ismf/Is4dc";
import is5 from "@/components/common/ispf/panel/ismf/Is5sc";
import is6 from "@/components/common/ispf/panel/ismf/Is6sg";
import is7 from "@/components/common/ispf/panel/ismf/Is7auto";
import is8 from "@/components/common/ispf/panel/ismf/Is8ctrl";
import is9 from "@/components/common/ispf/panel/ismf/Is9agg";
import is00 from "@/components/common/ispf/panel/ismf/Is00profile";
import is72 from "@/components/common/ispf/panel/ismf/Is72auto";
import p from "@/components/common/ispf/panel/PdfPanel";
import p32 from "@/components/common/ispf/panel/pdf/DsuPanel";
import p34 from "@/components/common/ispf/panel/pdf/DsluPanel";
import allocate_dataset from "@/components/common/ispf/panel/pdf/DsluPanel";
import dslist from "@/components/common/ispf/panel/pdf/DslistPanel";
import jcl from "@/components/common/ispf/panel/pdf/JCLPanel";
import pdslist from "@/components/common/ispf/panel/pdf/PdslistPanel";

const componentsMapping = {
  master,
  is,
  is0,
  is1,
  is2,
  is3,
  is4,
  is5,
  is6,
  is7,
  is8,
  is9,
  is00,
  is72,
  p,
  p32,
  p34,
  allocate_dataset,
  dslist,
  jcl,
  pdslist
};

export default {
  name: "ISPF",
  data() {
    return {};
  },
  computed: {
    currentPanel() {
      return componentsMapping[this.$store.state.ispf.currentPanel];
    }
  },
  methods: {
    goBack() {
      this.$store.commit("ispf/GO_BACK");
      console.log("go back");
    }
  }
};
</script>

<style scoped></style>
