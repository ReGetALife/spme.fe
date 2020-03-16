<template>
  <LabLayout>
    <template slot="left">
      <LabContent :content="content" />
    </template>
    <template slot="right">
      <LabReport :name="'步骤 ' + (fuckingnow + 1)">
        <div v-for="(questions, index) in steps" :key="index">
          <a-form
            type="vertical"
            @submit="handleSubmit"
            v-if="index === fuckingnow"
            :form="form"
          >
            <a-form-item
              v-for="(question, index) in questions"
              :key="index"
              :label="question"
              :colon="false"
            >
              <a-textarea
                autosize
                v-decorator="[
                  `step[${index}]`,
                  { initialValue: caogaos[index] }
                ]"
              ></a-textarea>
            </a-form-item>
            <div>
              <span>
                <a-button
                  style="margin-right: 10px"
                  :disabled="fuckingnow === 0"
                  @click="
                    fuckingnow--;
                    changepage();
                  "
                  >上一步</a-button
                >
                <a-button
                  :disabled="fuckingnow === steps.length - 1"
                  @click="
                    fuckingnow++;
                    question = 0;
                    changepage();
                  "
                  >下一步</a-button
                >
              </span>
              <span style="float: right">
                <a-button
                  style="margin-right: 10px"
                  type="primary"
                  @click="caogao"
                  >保存本页</a-button
                >
                <a-button type="primary" html-type="submit">提交所有</a-button>
              </span>
            </div>
          </a-form>
        </div>
      </LabReport>
      <a-divider />
      <Console />
    </template>
  </LabLayout>
</template>

<script>
import LabLayout from "@/components/common/LabContainer";
import LabContent from "@/components/common/LabContent";
import LabReport from "@/components/common/LabReport";
import Console from "@/components/Console2";
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
      form: this.$form.createForm(this),
      content,
      fuckingnow: 0,
      steps: [[], []],
      caogaos: []
    };
  },

  mounted() {
    this.$http({
      url: "/api/db/getQuestions",
      method: "POST",
      body: {
        lab: "CATALOG",
        lower_lab: 1,
        step: 1
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        console.log(response);
        for (var i = 0; i < response.body.length; i++) {
          this.steps[0].push(response.body[i].question);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    this.$http({
      url: "/api/db/getQuestions",
      method: "POST",
      body: {
        lab: "CATALOG",
        lower_lab: 1,
        step: 2
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        console.log(response);
        for (var i = 0; i < response.body.length; i++) {
          this.steps[1].push(response.body[i].question);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    this.$http({
      url: "/api/db/getdraft",
      method: "POST",
      body: {
        lab: "CATALOG",
        lower_lab: 1,
        step: 1
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        console.log(response);
        for (var i = 0; i < response.body.length; i++) {
          this.caogaos.push(response.body[i].answer);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      console.log("form submit");
      this.form.validateFields(err => {
        if (!err) {
          this.$http({
            url: "/api/db/submitLab",
            method: "POST",
            body: {
              lab: "CATALOG",
              lower_lab: 1,
              step: this.fuckingnow + 1
            },
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(function(response) {
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    },
    caogao() {
      console.log("caogao submit");
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(this.fuckingnow);
          for (var j = 0; j < this.steps[this.fuckingnow].length; j++) {
            this.$http({
              url: "/api/db/subAnswer",
              method: "POST",
              body: [
                {
                  lab: "CATALOG",
                  lower_lab: 1,
                  step: this.fuckingnow + 1,
                  question_id: j + 1,
                  answer: values.step[j]
                }
              ],
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(function(response) {
                console.log(response);
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        }
      });
    },
    changepage() {
      this.caogaos = [];
      this.$http({
        url: "/api/db/getdraft",
        method: "POST",
        body: {
          lab: "CATALOG",
          lower_lab: 1,
          step: this.fuckingnow + 1
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          console.log(response);
          for (var i = 0; i < response.body.length; i++) {
            this.caogaos.push(response.body[i].answer);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
