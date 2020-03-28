import Axios from "axios";
import { message } from "ant-design-vue";
const state = {
  lab: "",
  labStatus: "unsaved",
  labContent: "",
  subLab: "",
  step: 1,
  stepQuestions: [],
  stepDrafts: [],
  hasNextStep: true,
  isLoadingDoc: true,
  isLoadingQuestions: true,
  isLoadingDrafts: true,
  isSavingDrafts: false,
  isFetchingNext: true
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
    state.stepQuestions = v;
  },
  SET_DRAFTS(state, v) {
    state.stepDrafts = v;
  },
  SET_HAS_NEXT_STEP(state, v) {
    state.hasNextStep = v;
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
  },
  SET_IS_FETCHING_NEXT(state, v) {
    state.isFetchingNext = v;
  }
};

const actions = {
  getStepQuestions({ commit }, { lab, subLab, step }) {
    commit("SET_IS_LOADING_QUESTIONS", true);
    commit("SET_IS_FETCHING_NEXT", true);
    Axios.post("/api/db/getQuestions", {
      lab,
      lower_lab: subLab,
      step
    })
      .then(response => {
        commit("SET_QUESTIONS", response.data);
        commit("SET_IS_LOADING_QUESTIONS", false);
      })
      .catch(e => {
        message.error("获取问题失败，请重试：" + e.message).then();
        commit("SET_IS_LOADING_QUESTIONS", false);
      });
    // try to fetch next
    Axios.post("/api/db/getQuestions", {
      lab,
      lower_lab: subLab,
      step: step + 1
    })
      .then(() => {
        commit("SET_HAS_NEXT_STEP", true);
        commit("SET_IS_FETCHING_NEXT", false);
      })
      .catch(() => {
        commit("SET_HAS_NEXT_STEP", false);
        commit("SET_IS_FETCHING_NEXT", false);
      });
  },

  getStepDrafts({ commit }, { lab, subLab, step }) {
    commit("SET_DRAFTS", []);
    commit("SET_IS_LOADING_DRAFTS", true);
    Axios.post("/api/db/getDraft", {
      lab,
      lower_lab: subLab,
      step
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

  getDoc({ commit }, labName) {
    commit("SET_IS_LOADING_DOC", true);
    Axios.get(`/docs/racf/${labName}.md`)
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
    const answers = state.stepQuestions.map((q, index) => {
      const answer = draftsTemp[index] || "";
      return {
        lab: state.lab,
        lower_lab: state.subLab.split("lab")[1],
        step: state.step,
        question_id: q.question_id,
        answer
      };
    });

    Axios.post("/api/db/subAnswer", answers)
      .then(() => {
        commit("SET_DRAFTS", draftsTemp);
        message.success(`步骤 ${state.step} 已保存 👍`).then();
        commit("SET_IS_SAVING_DRAFTS", false);
      })
      .catch(e => {
        message.error("本实验已提交，保存无效：" + e.message).then();
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
    commit("SET_STEP", 1);
    dispatch("getDoc", state.subLab);
    if (subLab !== "intro") {
      const params = {
        lab: state.lab,
        subLab: state.subLab.split("lab")[1],
        step: state.step
      };
      dispatch("getStepQuestions", params);
      dispatch("getStepDrafts", params);
    }
  },

  updateStepQuestions({ dispatch, state }, step) {
    if (state.subLab !== "intro") {
      const params = {
        lab: state.lab,
        subLab: state.subLab.split("lab")[1],
        step: step
      };
      dispatch("getStepQuestions", params);
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
