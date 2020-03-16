<template>
  <LabLayout>
    <template slot="left">
      <LabContent :content="content" />
    </template>
  </LabLayout>
</template>

<script>
import LabLayout from "@/components/common/LabContainer";
import LabContent from "@/components/common/LabContent";
import content from "./intro.md";
export default {
  components: {
    LabLayout,
    LabContent
  },
  data() {
    return { content };
  }
};
</script>
