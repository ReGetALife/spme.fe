<template>
  <LabContainer lab-name="SMS">
    <ISPF />
  </LabContainer>
</template>

<script>
import LabContainer from "@/components/common/lab/LabContainer";
import ISPF from "@/components/common/ispf/ISPF";
export default {
  components: {
    ISPF,
    LabContainer
  }
};
</script>
