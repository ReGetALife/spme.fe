<template>
  <LabContainer lab-name="REXX">
    <Console defaultTab="rexx" />
  </LabContainer>
</template>

<script>
import LabContainer from "@/components/common/lab/LabContainer";
import Console from "@/components/common/console/Console";
export default {
  components: {
    LabContainer,
    Console
  }
};
</script>
