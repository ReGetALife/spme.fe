<template>
  <div class="lab-content markdown-body">
    <vue-markdown :source="content"> </vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  components: { VueMarkdown },
  props: ["content"]
};
</script>

<style lang="scss">
.lab-content {
  img {
    max-width: 100%;
  }
}
</style>
