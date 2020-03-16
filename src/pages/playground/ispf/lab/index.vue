<template>
  <LabLayout>
    <template slot="left">
      <LabContent :content="content" />
    </template>
    <template slot="right">
      <Console />
    </template>
  </LabLayout>
</template>

<script>
import axios from "axios";
import LabLayout from "@/components/common/LabContainer";
import LabContent from "@/components/common/LabContent";
// import LabReport from "@/components/LabReport";
import Console from "@/components/Console/SMSConsole";
import content from "./lab1.md";

export default {
  components: {
    LabLayout,
    LabContent,
    // LabReport,
    Console
  },
  data() {
    return {
      content,
      labid: 3,
      currentStepIndex: 0,
      steps: [1, 13, 17],
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
