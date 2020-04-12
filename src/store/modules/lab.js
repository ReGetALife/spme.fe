import Axios from "axios";
import { message } from "ant-design-vue";
const state = {
  lab: "",
  labStatus: "unsaved",
  labContent: "",
  subLab: "",
  step: 1,
  subLabQuestions: { steps: [], stepQuestions: {} },
  stepDrafts: [],
  isLoadingDoc: true,
  isLoadingQuestions: true,
  isLoadingDrafts: false,
  isSavingDrafts: false
};

const mutations = {
  SET_LAB(state, v) {
    state.lab = v;
  },
  SET_LAB_STATUS(state, v) {
    state.labStatus = v;
  },
  SET_LAB_CONTENT(state, v) {
    state.labContent = v;
  },
  SET_SUB_LAB(state, v) {
    state.subLab = v;
  },
  SET_STEP(state, v) {
    state.step = v;
  },
  SET_QUESTIONS(state, v) {
    state.subLabQuestions = v;
  },
  SET_DRAFTS(state, v) {
    state.stepDrafts = v;
  },
  SET_IS_LOADING_DOC(state, v) {
    state.isLoadingDoc = v;
  },
  SET_IS_LOADING_QUESTIONS(state, v) {
    state.isLoadingQuestions = v;
  },
  SET_IS_LOADING_DRAFTS(state, v) {
    state.isLoadingDrafts = v;
  },
  SET_IS_SAVING_DRAFTS(state, v) {
    state.isSavingDrafts = v;
  }
};

const actions = {
  getQuestions({ commit, dispatch }, { lab, subLab }) {
    commit("SET_IS_LOADING_QUESTIONS", true);
    commit("SET_STEP", 1);
    commit("SET_QUESTIONS", { steps: [], stepQuestions: {} });
    Axios.post("/api/db/getQuestions", {
      lab,
      lower_lab: subLab
    })
      .then(response => {
        let questions = { steps: [], stepQuestions: {} };
        // find all steps
        response.data.forEach(e => {
          if (questions.steps.find(s => s === e.step) === undefined) {
            questions.steps.push(e.step);
            questions.stepQuestions[e.step] = [];
          }
        });
        // sort steps
        questions.steps.sort((a, b) => a - b);
        // map all questions with step
        response.data.forEach(e => {
          if (questions.stepQuestions[e.step] === undefined) {
            questions.stepQuestions[e.step] = [e];
          } else {
            questions.stepQuestions[e.step].push(e);
          }
        });
        // set first step
        commit("SET_STEP", questions.steps[0]);
        commit("SET_QUESTIONS", questions);
        commit("SET_IS_LOADING_QUESTIONS", false);
        dispatch("getStepDrafts", {
          lab,
          subLab,
          step: questions.steps[0]
        });
      })
      .catch(e => {
        message.error("获取问题失败，请重试：" + e.message).then();
        commit("SET_IS_LOADING_QUESTIONS", false);
      });
  },

  getStepDrafts({ commit }, { lab, subLab, step }) {
    commit("SET_DRAFTS", []);
    commit("SET_IS_LOADING_DRAFTS", true);
    Axios.get("/api/draft", {
      params: {
        lab,
        lower_lab: subLab,
        step
      }
    })
      .then(response => {
        let d = [];
        response.data.forEach((v, i) => {
          d[(v && v.question_id - 1) || i] = v && v.answer;
        });
        commit("SET_DRAFTS", d);
        commit("SET_IS_LOADING_DRAFTS", false);
      })
      .catch(() => {
        commit("SET_IS_LOADING_DRAFTS", false);
      });
  },

  getDoc({ commit, state }, labName) {
    commit("SET_IS_LOADING_DOC", true);
    Axios.get(`/docs/${state.lab.toLowerCase()}/${labName}.md`)
      .then(response => {
        commit("SET_LAB_CONTENT", response.data);
        commit("SET_IS_LOADING_DOC", false);
      })
      .catch(e => {
        message.error("获取实验说明失败：" + e.message).then();
        commit("SET_IS_LOADING_DOC", false);
      });
  },

  saveToDrafts({ commit, state }, draftsTemp) {
    commit("SET_IS_SAVING_DRAFTS", true);
    const answers = state.subLabQuestions.stepQuestions[state.step].map(
      (q, index) => {
        const answer = draftsTemp[index] || "";
        return {
          lab: state.lab,
          lower_lab: state.subLab.split("lab")[1],
          step: state.step,
          question_id: q.question_id,
          answer
        };
      }
    );

    Axios.post("/api/draft", answers)
      .then(() => {
        commit("SET_DRAFTS", draftsTemp);
        message.success(`步骤 ${state.step} 已保存 👍`).then();
        commit("SET_IS_SAVING_DRAFTS", false);
      })
      .catch(e => {
        message.warn("答案超过了15000个字符：" + e.message).then();
        commit("SET_IS_SAVING_DRAFTS", false);
      });
  },

  initLab({ commit }, labName) {
    commit("SET_LAB", labName);
    Axios.get("/api/db/getLabStatus")
      .then(res => {
        const lab = res.data.find(e => e.lab === labName);
        const status = (lab && lab.status) || "unsaved";
        commit("SET_LAB_STATUS", status);
      })
      .catch();
  },

  initSubLab({ dispatch, commit, state }, subLab) {
    commit("SET_SUB_LAB", subLab);
    dispatch("getDoc", state.subLab);
    if (subLab !== "intro") {
      const params = {
        lab: state.lab,
        subLab: state.subLab.split("lab")[1]
      };
      dispatch("getQuestions", params);
    }
  },

  updateStepDrafts({ dispatch, state }, step) {
    if (state.subLab !== "intro") {
      const params = {
        lab: state.lab,
        subLab: state.subLab.split("lab")[1],
        step: step
      };
      dispatch("getStepDrafts", params);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
