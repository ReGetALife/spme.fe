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
            :loading="isFetchingNext"
            @click="step--"
            >上一步</a-button
          >
          <a-button
            icon="right-circle"
            :disabled="!this.hasNextStep"
            :loading="isFetchingNext"
            @click="step++"
            >下一步</a-button
          >
        </span>
        <span style="float: right">
          <a-popover style="margin-right: 10px">
            <template slot="content">
              保存了回答后才可以提交实验报告。
            </template>
            <a-icon type="question-circle" style="cursor: pointer" />
          </a-popover>
          <a-button
            style="margin-right: 10px"
            type="primary"
            :disabled="$store.state.lab.labStatus === 'submitted'"
            @click="this.saveToDrafts"
            >保存本页</a-button
          >
        </span>
      </div>
      <a-divider />
      <slot>
        <!-- default content -->
        <Console />
      </slot>
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
    return {};
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
    this.$store.dispatch("lab/initLab", this.labName);
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
