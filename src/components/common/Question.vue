<template>
  <div>
    <p v-if="questions.length === 0">暂无问题</p>
    <a-form v-else :form="form" layout="vertical" @submit="handleSubmit">
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
import Axios from "axios";
export default {
  data() {
    return {
      form: this.$form.createForm(this),
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
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields }
      } = this;

      validateFields(async (errors, values) => {
        if (errors) return;
        this.isLoading = true;
        try {
          const response = await Axios.post("/api/racf/inputCommand", values);
          this.result = response.data;
        } catch (error) {
          this.$message.error("服务器错误");
        } finally {
          this.isLoading = false;
        }
      });
    },

    saveCurrent() {
      let _this = this;
      let QAarray = this.stepQuestion.map((q, index) => {
        return {
          lab: "RACF",
          lower_lab: _this.lower_lab,
          step: _this.step,
          question_id: q.question_id,
          answer: _this.drafts[index]
        };
      });

      Axios.post("/api/db/subAnswer", QAarray)
        .then(response => {
          if (response.data.error === "OK") {
            this.$message.success("保存成功");
          }
        })
        .catch(e => {
          e.response.status;
          this.$message.error("实验已提交，保存无效");
        });
    },

    submitAll() {
      Axios.post("/api/db/submitLab", {
        lab: "RACF",
        lower_lab: this.lower_lab,
        step: this.step
      })
        .then(response => {
          if (response.data.errcode != 404) {
            this.$message.success("成功提交实验报告，等待老师批阅");
          }
        })
        .catch(e => {
          e.response.status;
          this.$message.error("提交失败，请重试");
        });
    }
  }
};
</script>
