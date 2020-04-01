<template>
  <div class="master-panel" @keyup.114="goBackSave">
    <h3 class="panel-title">EDIT {{ this.$route.query.dsn }}</h3>
    <!-- <textarea name="" id="" cols="80" rows="15" v-model="jclText"></textarea> -->
    <a-textarea class="panel-text" :rows="15" v-model="jclText" />
    <br />
    <br />

    <a-row>
      <a-col :span="21">
        <div v-focus class="input">
          <a-input
            class="panel-option"
            addonBefore="Command >"
            @keyup.enter="Command"
            v-model="cmd"
          />
        </div>
      </a-col>
      <a-col :span="3">
        <a-button class="save-button" type="primary" @click="Save"
          >Save</a-button
        >
      </a-col>
    </a-row>
    <hr />
  </div>
</template>

<script>
export default {
  name: "jcl-panel",
  data() {
    return {
      cmd: "",
      jclText: ""
    };
  },
  created() {
    this.getDsContent();
  },
  methods: {
    getDsContent() {
      // 获取数据集（成员）内容
      this.$http
        .get(`/api/sms/getds?dsName=${this.$route.query.dsn}`)
        .then(res => {
          console.log("JCLPanel Put '/sms/getds' Success:", res);

          // var jclList = res.data.split("\n");
          // console.log(jclList)
          this.jclText = res.data;
          this.jclText.replace(/\s/g, "\t");

          // for (let i = 0; i < jclList.length; i++) {
          //   //this.jclText += jclList[i].substr(0, jclList[i].length - 8) + "\n";
          //   //var tmp = jclList[i].split("                ");
          //   this.jclText += jclList[i] + "\n";
          // }
          console.log(this.jclText);
        })
        .catch(err => {
          console.log("JCLPanel GET '/sms/getds' Error: ", err);
        });
    },
    Write() {
      // 写入 JCL
      this.$http
        .put("/api/sms/writeds", {
          dsName: this.$route.query.dsn,
          jclList: this.jclText.split("\n")
        })
        .then(res => {
          console.log("JCLPanel Put '/sms/writeds' Success:", res);
          this.$message.success("Saved");
        })
        .catch(err => {
          console.log("JCLPanel Put '/sms/writeds' Error: ", err);
        });
    },
    Submit() {
      // 提交 JCL
      console.log(this.jclText.split("\n"));
      this.$http
        .put("/api/sms/subjob", {
          jclList: this.jclText.split("\n")
        })
        .then(res => {
          console.log("JCLPanel Put '/sms/subjob' Success:", res);
          this.$message.info("Job " + res.data.jobid + " Submitted");
          this.jclResult(
            //res.data.jobid + res.data.type + res.data.jobname + res.data.status
            res.data
          );
        })
        .catch(err => {
          console.log("JCLPanel Put '/sms/subjob' Error: ", err);
        });
    },
    Command() {
      if (this.cmd.toUpperCase() == "SUBMIT") {
        this.Write();
        this.Submit();
      } else
        this.$message.error("Command " + this.cmd.toUpperCase() + " Not Found");
      //console.log(this.cmd, this.jclText)
    },
    goBackSave() {
      this.Write();
    },
    Save() {
      this.Write();
    },
    jclResult(result) {
      const h = this.$createElement;
      this.$info({
        title: "Job Result",
        content: h("div", {}, [h("p", result)]),
        onOk() {}
      });
    }
  }
};
</script>

<style>
.panel-text {
  /* 等宽字体！非常重要！让对齐成为可能 */
  font-family: "Courier New", Courier, monospace;
  white-space: nowrap;
  overflow-x: auto;
  background-color: black;
  color: greenyellow;
}

.save-button {
  /* margin-top: 10px; */
  margin-left: 2px;
  width: 60px;
  background-color: black;
}
</style>
