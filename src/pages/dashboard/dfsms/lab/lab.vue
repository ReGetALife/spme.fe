<template>
  <keep-alive>
    <component :is="currentComponent" @saveOrSubmit="saveOrSubmit"></component>
  </keep-alive>
</template>

<script>
import axios from "axios";
import dfsmsIntro from "@/pages/dashboard/dfsms/intro";
import dfsmsLab1 from "@/pages/dashboard/dfsms/lab1";
import dfsmsLab2 from "@/pages/dashboard/dfsms/lab2";
import dfsmsLab3 from "@/pages/dashboard/dfsms/lab3";
import dfsmsLab4 from "@/pages/dashboard/dfsms/lab4";
import dfsmsLab5 from "@/pages/dashboard/dfsms/lab5";
import dfsmsLab6 from "@/pages/dashboard/dfsms/lab6";
import dfsmsLab7 from "@/pages/dashboard/dfsms/lab7";

export default {
  components: {
    dfsmsIntro,
    dfsmsLab1,
    dfsmsLab2,
    dfsmsLab3,
    dfsmsLab4,
    dfsmsLab5,
    dfsmsLab6,
    dfsmsLab7
  },
  data() {
    return {};
  },
  computed: {
    currentComponent() {
      // console.log(this.$route.params.lab)
      return "dfsms-" + this.$route.params.lab;
    }
  },
  methods: {
    saveOrSubmit(isDraft, questions) {
      if (isDraft) {
        let reqBody = questions;
        axios
          .post(`/api/db/subAnswer`, reqBody)
          .then(() => {
            this.$message.success("保存成功");
          })
          .catch(err => {
            this.$message.error("保存失败 " + err);
            console.log(err);
          });
      } else {
        let reqBody = {
          lab: "DFSMS",
          lower_lab: questions[0].lower_lab,
          step: questions[0].step
        };
        axios
          .post(`/api/db/submitLab`, reqBody)
          .then(() => {
            // axios
            //   .post(`/api/db/saveReports`, {
            //     lab: "SMS"
            //   })
            //   .then(() => console.log("生成 pdf 成功"));
            this.$message.success("提交成功");
          })
          .catch(err => {
            this.$message.error("提交失败 " + err);
            console.log(err);
          });
      }
    }
  }
};
</script>
