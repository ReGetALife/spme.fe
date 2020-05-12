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
import is_3 from "@/components/common/ispf/panel/ismf/ManagementClass";
import is_3_3 from "@/components/common/ispf/panel/ismf/DefineManagementClass";
import is_4 from "@/components/common/ispf/panel/ismf/DataClass";
import is_4_3 from "@/components/common/ispf/panel/ismf/DefineDataClass";
import is_5 from "@/components/common/ispf/panel/ismf/StorageClass";
import is_5_3 from "@/components/common/ispf/panel/ismf/DefineStorageClass";
import is_6 from "@/components/common/ispf/panel/ismf/StorageGroup";
import is_6_5 from "@/components/common/ispf/panel/ismf/StorageGroupVolume";
import is_6_3_pool from "@/components/common/ispf/panel/ismf/DefinePoolStorageGroup";
import is_7 from "@/components/common/ispf/panel/ismf/Acs";
import is_7_2 from "@/components/common/ispf/panel/ismf/TranslateAcs";
import is_7_3 from "@/components/common/ispf/panel/ismf/ValidateAcs";
import is_7_4 from "@/components/common/ispf/panel/ismf/TestAcs";
import is_8 from "@/components/common/ispf/panel/ismf/ControlDataset";
import is_8_1 from "@/components/common/ispf/panel/ismf/DisplayBaseConfig";
import is_8_2 from "@/components/common/ispf/panel/ismf/DefineBaseConfig";
import is_8_3 from "@/components/common/ispf/panel/ismf/AlterBaseConfig";
import is_0_0 from "@/components/common/ispf/panel/ismf/Is00profile";
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
  is_3,
  is_3_3,
  is_4,
  is_4_3,
  is_5,
  is_5_3,
  is_6,
  is_6_5,
  is_6_3_pool,
  is_7,
  is_7_2,
  is_7_3,
  is_7_4,
  is_8,
  is_8_1,
  is_8_2,
  is_8_3,
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
      if (!componentsMapping[this.$store.state.ispf.currentPanel]) {
        this.$message.warn("该选项暂不支持");
        this.goBack();
      }
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
