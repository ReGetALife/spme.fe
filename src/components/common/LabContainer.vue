<template>
  <div class="lab-container">
    <div class="left">
      <a-spin size="large" :spinning="this.isLoadingDoc">
        <LabContent :content="content" />
      </a-spin>
    </div>
    <div class="divider" v-if="this.subLab !== 'intro'"></div>
    <div class="right" v-if="this.subLab !== 'intro'">
      <h2>步骤 {{ step }}</h2>
      <a-spin :spinning="this.isLoading">
        <Question ref="question" />
      </a-spin>
      <div>
        <span>
          <a-button
            style="margin-right: 10px"
            icon="left-circle"
            :disabled="step === 1"
            @click="step--"
            >上一步</a-button
          >
          <a-button
            @click="step++"
            :loading="isFetchingNext"
            icon="right-circle"
            :disabled="!this.hasNextStep"
            >下一步</a-button
          >
        </span>
        <span style="float: right">
          <a-button
            style="margin-right: 10px"
            type="primary"
            @click="this.saveToDrafts"
            >保存本页</a-button
          >
          <a-button
            type="primary"
            @click="visible = true"
            v-if="!this.hasNextStep"
            >提交所有</a-button
          >
          <a-modal title="确认提交？" v-model="visible" @ok="() => {}">
            <p>提交报告后老师将可以看到</p>
            <p>同时将不能再对答案进行更改。</p>
            <p>确定提交报告吗</p>
          </a-modal>
        </span>
      </div>
      <a-divider />
      <Console />
    </div>
  </div>
</template>

<script>
import LabContent from "@/components/common/LabContent";
import Question from "@/components/common/Question";
import Console from "@/components/common/Console";
export default {
  components: { LabContent, Question, Console },
  props: {
    labName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    content() {
      return this.$store.state.lab.labContent;
    },
    subLab() {
      return this.$route.params.subLab;
    },
    step: {
      get() {
        return this.$store.state.lab.step;
      },
      set(v) {
        this.$store.commit("lab/SET_STEP", v);
      }
    },
    isLoadingDoc() {
      return this.$store.state.lab.isLoadingDoc;
    },
    isLoading() {
      return (
        this.$store.state.lab.isLoadingQuestions ||
        this.$store.state.lab.isLoadingDrafts ||
        this.$store.state.lab.isSavingDrafts
      );
    },
    hasNextStep() {
      return this.$store.state.lab.hasNextStep;
    },
    isFetchingNext() {
      return this.$store.state.lab.isFetchingNext;
    }
  },
  // init data
  created() {
    this.$store.commit("lab/SET_LAB", this.labName);
    this.$store.dispatch("lab/initSubLab", this.subLab);
  },
  methods: {
    saveToDrafts() {
      this.$store.dispatch("lab/saveToDrafts", this.$refs.question.draftsTemp);
    }
  },
  watch: {
    subLab() {
      this.$store.dispatch("lab/initSubLab", this.subLab);
    },
    step(newValue) {
      this.$store.dispatch("lab/updateStepQuestions", newValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.lab-container {
  display: flex;
  justify-content: center;
  position: relative;

  height: 100%;

  .left,
  .right {
    flex: 1 1 0;
    overflow: auto;
  }

  .divider {
    position: relative;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #ddd;
    margin: 0 10px;
  }
}
</style>
