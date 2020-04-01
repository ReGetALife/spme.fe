<template>
  <div class="ismf-main">
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
import ismf0 from "@/components/Console/Panel/ismf/Is0profile";
import ismf1 from "@/components/Console/Panel/ismf/Is1dataSet";
import ismf2 from "@/components/Console/Panel/ismf/Is2volume";
import ismf3 from "@/components/Console/Panel/ismf/Is3class";
import ismf4 from "@/components/Console/Panel/ismf/Is4dc";
import ismf5 from "@/components/Console/Panel/ismf/Is5sc";
import ismf6 from "@/components/Console/Panel/ismf/Is6sg";
import ismf7 from "@/components/Console/Panel/ismf/Is7auto";
import ismf8 from "@/components/Console/Panel/ismf/Is8ctrl";
import ismf9 from "@/components/Console/Panel/ismf/Is9agg";

export default {
  components: {
    ismf0,
    ismf1,
    ismf2,
    ismf3,
    ismf4,
    ismf5,
    ismf6,
    ismf7,
    ismf8,
    ismf9
  },
  data() {
    return {};
  },
  computed: {
    currentComponent() {
      // console.log(this.$route.params.lab)
      return "ismf" + this.$route.params.option;
    }
  }
};
</script>
