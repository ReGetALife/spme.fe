<template>
  <LabContainer lab-name="SMP">
    <Console defaultTab="jcl" />
  </LabContainer>
</template>

<script>
import LabContainer from "@/components/common/lab/LabContainer";
import Console from "@/components/common/console/Console";
export default {
  name: "SMP",
  components: {
    LabContainer,
    Console
  }
};
</script>

<style scoped></style>
