<template>
  <LabLayout>
    <template slot="left">
      <LabContent :content="content" />
    </template>
  </LabLayout>
</template>

<script>
import LabLayout from "@/components/LabLayout";
import LabContent from "@/components/LabContent";
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
