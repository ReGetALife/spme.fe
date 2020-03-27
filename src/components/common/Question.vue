<template>
  <div>
    <p v-if="questions.length === 0">暂无问题</p>
    <a-form v-else :form="form" layout="vertical">
      <a-form-item
        v-for="(Ques, index) in questions"
        :key="Ques ? Ques.question_id : index"
        :label="Ques ? Ques.question : 'No question, please skip this one.'"
        :colon="false"
      >
        <a-input
          v-model="draftsTemp[(Ques && Ques.question_id - 1) || index]"
          placeholder="请输入你的回答"
        ></a-input>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      // don't use drafts(which stored in vuex) directly
      // because v-model cannot change element of drafts without mutation
      // so use draftsTemp as a copy
      draftsTemp: []
    };
  },
  computed: {
    questions() {
      return this.$store.state.lab.stepQuestions;
    },
    drafts() {
      return this.$store.state.lab.stepDrafts;
    }
  },
  watch: {
    drafts(newValue) {
      // update draftsTemp for v-model when draft is fetched
      this.draftsTemp = [...newValue];
    }
  }
};
</script>

<style>
.ant-form-item-label {
  /* fix text cannot fully display */
  white-space: normal;
}
</style>
