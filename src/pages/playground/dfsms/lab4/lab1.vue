<template>
  <LabLayout>
    <template slot="left">
      <LabContent :content="content" />
    </template>
    <template slot="right">
      <LabReport :name="'步骤 ' + steps[currentStepIndex]">
        <a-form type="vertical" @submit="handleSubmit">
          <a-form-item
            v-for="(question, index) in questions"
            :key="index"
            :label="question.question"
            :colon="false"
          >
            <a-input v-model="question.answer"></a-input>
          </a-form-item>
          <div>
            <span>
              <a-button
                @click="currentStepIndex -= 1"
                :disabled="currentStepIndex === 0"
                style="margin-right: 10px"
                >上一步</a-button
              >
              <a-button
                @click="currentStepIndex += 1"
                :disabled="currentStepIndex === steps.length - 1"
                >下一步</a-button
              >
            </span>
            <span style="float: right">
              <a-button
                style="margin-right: 10px"
                type="primary"
                @click="handleSubmit($event, 1)"
                >保存本页</a-button
              >
              <a-button type="primary" html-type="submit">提交所有</a-button>
            </span>
          </div>
        </a-form>
      </LabReport>
      <a-divider />
      <Console />
    </template>
  </LabLayout>
</template>

<script>
import axios from "axios";
import LabLayout from "@/components/LabLayout";
import LabContent from "@/components/LabContent";
import LabReport from "@/components/LabReport";
import Console from "@/components/Console/SMSConsole";
import content from "./lab1.md";

export default {
  components: {
    LabLayout,
    LabContent,
    LabReport,
    Console
  },
  data() {
    return {
      content,
      labid: 4,
      currentStepIndex: 0,
      steps: [6, 7],
      questions: []
    };
  },
  created() {
    this.getQandA();
  },
  methods: {
    getQandA() {
      let reqBody = {
        lab: "SMS",
        lower_lab: this.labid,
        step: this.steps[this.currentStepIndex]
      };

      axios
        .post(`/api/db/getQuestions`, reqBody)
        .then(res => {
          // console.log(res);
          this.questions = res.data.map(q => {
            q.lab = "SMS";
            q.lower_lab = this.labid;
            q.step = this.steps[this.currentStepIndex];
            q.answer = "";
            return q;
          });
          axios
            .post(`/api/db/getdraft`, reqBody)
            .then(res => {
              let answers = res.data;
              answers.forEach(a => {
                this.questions.find(
                  q => q.question_id === a.question_id
                ).answer = a.answer;
              });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    },
    handleSubmit(e, isDraft) {
      e.preventDefault();
      this.$emit("saveOrSubmit", isDraft, this.questions);
      console.log("form submit");
    }
  },
  watch: {
    currentStepIndex: function() {
      this.getQandA();
    }
  }
};
</script>
