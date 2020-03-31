<template>
  <LabLayout>
    <template slot="left">
      <LabContent :content="content" />
    </template>
    <template slot="right">
      <LabReport :name="null">
        <div v-for="(questions, index) in steps" :key="index">
          <h2>{{ questions.question }}</h2>
          <div>
            <span style="visibility:hidden">
              <a-button
                style="margin-right: 10px"
                :disabled="fuckingnow === 0"
                @click="fuckingnow--"
                >上一步</a-button
              >
              <a-button
                :disabled="fuckingnow === steps.length - 1"
                @click="fuckingnow++"
                >下一步</a-button
              >
            </span>
            <span style="float: right">
              <a-button
                style="margin-right: 15px"
                type="primary"
                @click="subDraft(questions.question_id)"
                >保存本页</a-button
              >
              <a-button
                style="margin-right: 15px"
                type="primary"
                html-type="submit"
                @click="sub()"
                v-if="index == steps.length - 1"
                >提交所有</a-button
              >
            </span>
          </div>
        </div>
      </LabReport>
      <a-divider />
      <Rexx ref="rexx" />
    </template>
  </LabLayout>
</template>

<script>
import LabLayout from "@/components/common/lab/LabContainer";
import LabContent from "@/components/common/lab/LabContent";
import Rexx from "@/components/Rexx";
import content from "./lab2.md";
import Axios from "axios";

export default {
  components: {
    LabLayout,
    LabContent,
    Rexx
  },
  data() {
    return {
      content,
      fuckingnow: 0,
      steps: [[]]
    };
  },
  created: function() {
    var _this = this;
    var data = {
      lab: "REXX",
      lower_lab: "2",
      step: "1"
    };
    Axios({
      method: "post",
      url: "/api/db/getQuestions",
      data: data
    })
      .then(response => {
        _this.steps = response.data;
        // _this.steps = _this.steps.concat(response.data);
        console.log(_this.steps[0]);
      })
      .catch(error => {
        console.log(error);
        console.log("fail to get the q");
      });
  },
  methods: {
    sub() {
      var data = {
        lab: "REXX",
        lower_lab: 2,
        step: 1
      };
      Axios({
        method: "post",
        url: "/api/db/submitLab",
        data: data
      })
        .then(response => {
          console.log(response);
          console.log("sub");
        })
        .catch(error => {
          console.log(error);
          console.log("fail to sub");
        });
    },
    subDraft(q_id) {
      var q;
      if (q_id == 1) {
        q = this.$refs.rexx.rexxCode;
        console.log("subDraft rexxCode");
      }
      if (q_id == 2) {
        q = this.$refs.rexx.result;
        console.log("subDraft ans");
      }
      var data = [
        {
          lab: "REXX",
          lower_lab: 2,
          step: 1,
          question_id: q_id,
          answer: q
        }
      ];
      console.log(this.$refs.rexx.rexxCode);
      Axios({
        method: "post",
        url: "/api/db/subAnswer",
        data: data
      })
        .then(response => {
          console.log(response);
          console.log("subDraft");
        })
        .catch(error => {
          console.log(error);
          console.log("fail to subDraft");
        });
    }
  }
};
</script>
