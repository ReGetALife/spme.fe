<template>
  <div>
    <p v-if="questionsInStep.length === 0">暂无问题</p>
    <a-form v-else :form="form" layout="vertical" @submit="handleSubmit">
      <a-form-item
        v-for="(Ques, index) in questionsInStep"
        :key="Ques ? Ques.question_id : index"
        :label="Ques ? Ques.question : 'haha'"
        :colon="false"
      >
        <a-input v-model="drafts[index]" placeholder="请输入你的回答"></a-input>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  props: {
    lower_lab: {
      type: Number,
      default: 1
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      questionsInStep: [],
      drafts: [],
      form: this.$form.createForm(this)
    };
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
      let QAarray = this.questionsInStep.map((q, index) => {
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
    },

    getdraft() {
      // 每次获取到问题的时候就获取一下草稿
      let _this = this;
      _this.drafts = [];
      let params = {
        lab: "RACF",
        lower_lab: this.lower_lab,
        step: this.step
      };

      try {
        Axios.post("/api/db/getdraft", params).then(response => {
          if (response.data.errcode != 404) {
            response.data.forEach(element => {
              _this.drafts.push(element.answer);
            });
          }
        });
      } catch (error) {
        error;
      }
    },

    getquestion() {
      let _this = this;
      Axios.post("/api/db/getQuestions", {
        lab: "RACF",
        lower_lab: this.lower_lab,
        step: this.step
      })
        .then(response => {
          if (response.data.errcode != 404) {
            _this.questionsInStep = response.data;
          }
        })
        .catch(e => {
          e.response.status;
          this.$message.error("获取问题失败，请重试");
        });
    }
  },
  mounted() {
    // 初始获取问题和草稿
    this.getquestion();
  },
  watch: {
    questionsInStep() {
      // 更换 step 的时候获取问题
      this.getdraft();
    },
    step() {
      // 更换 step 的时候获取问题
      this.getquestion();
      this.drafts = [];
    },
    lower_lab() {
      // 更换 lower_lab 的时候获取问题
      this.getquestion();
      this.drafts = [];
    }
  }
};
</script>
