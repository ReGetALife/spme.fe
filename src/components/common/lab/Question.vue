<template>
  <div>
    <p
      v-if="
        (questions === undefined || questions.length === 0) &&
          !this.$store.state.lab.isLoadingQuestions
      "
    >
      暂无问题
    </p>
    <p v-if="this.$store.state.lab.isLoadingQuestions">题目加载中……</p>
    <a-form v-else :form="form" layout="vertical">
      <a-form-item
        v-for="(Ques, index) in questions"
        :key="Ques.question_id"
        :label="
          Ques
            ? Ques.question_id + '. ' + Ques.question
            : 'No question, please skip this one.'
        "
        :colon="false"
      >
        <a-textarea
          v-model="draftsTemp[index]"
          placeholder="请输入你的回答"
          autosize
          :disabled="submitted"
        ></a-textarea>
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
      const stepQuestions = this.$store.state.lab.subLabQuestions.stepQuestions;
      return stepQuestions && stepQuestions[this.$store.state.lab.step];
    },
    drafts() {
      return this.$store.state.lab.stepDrafts;
    },
    submitted() {
      return this.$store.state.lab.labStatus === "submitted";
    }
  },
  watch: {
    drafts(newValue) {
      // update draftsTemp for v-model when draft is fetched
      // stringify and parse to deep clone this array
      this.draftsTemp = JSON.parse(JSON.stringify(newValue));
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
