<template>
  <div>
    <h2>ISPF Emulator</h2>
    <a-button icon="rollback" @click="goBack">F3</a-button>
    <keep-alive>
      <component :is="currentPanel"></component>
    </keep-alive>
  </div>
</template>

<script>
import master from "@/components/common/ispf/panel/MasterPanel";
import is from "@/components/common/ispf/panel/IsmfPanel";
import is_0 from "@/components/common/ispf/panel/ismf/Is0profile";
import is_1 from "@/components/common/ispf/panel/ismf/Is1dataSet";
import is_2 from "@/components/common/ispf/panel/ismf/Is2volume";
import is_3 from "@/components/common/ispf/panel/ismf/Is3class";
import is_4 from "@/components/common/ispf/panel/ismf/Is4dc";
import is_5 from "@/components/common/ispf/panel/ismf/Is5sc";
import is_6 from "@/components/common/ispf/panel/ismf/Is6sg";
import is_7 from "@/components/common/ispf/panel/ismf/Is7auto";
import is_8 from "@/components/common/ispf/panel/ismf/Is8ctrl";
import is_0_0 from "@/components/common/ispf/panel/ismf/Is00profile";
import is_7_2 from "@/components/common/ispf/panel/ismf/Is72auto";
import p from "@/components/common/ispf/panel/PdfPanel";
import p_3_2 from "@/components/common/ispf/panel/pdf/DsuPanel";
import p_3_2_a from "@/components/common/ispf/panel/pdf/AllocatePanel";
import p_3_4 from "@/components/common/ispf/panel/pdf/DsluPanel";
import p_3_4_blank from "@/components/common/ispf/panel/pdf/DslistPanel";
import p_3_4_blank_e from "@/components/common/ispf/panel/pdf/PdslistPanel";
import edit from "@/components/common/ispf/panel/pdf/EditPanel";

const componentsMapping = {
  master,
  is,
  is_0,
  is_0_0,
  is_1,
  is_2,
  is_3,
  is_4,
  is_5,
  is_6,
  is_7,
  is_7_2,
  is_8,
  p,
  p_3_2,
  p_3_2_a,
  p_3_4,
  p_3_4_blank,
  p_3_4_blank_e,
  edit
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
    }
  }
};
</script>

<style scoped></style>
