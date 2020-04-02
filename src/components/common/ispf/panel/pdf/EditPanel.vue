<template>
  <div class="master-panel" @keyup.114="goBackSave">
    <h3 class="panel-title">EDIT {{ this.$store.state.ispf.dsMember }}</h3>
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
  name: "edit-panel",
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
        .get(`/api/sms/getds?dsName=${this.$store.state.ispf.dsMember}`)
        .then(res => {
          this.jclText = res.data;
          this.jclText.replace(/\s/g, "\t");
        })
        .catch(err => {
          this.$message.error("请求错误：" + err.message);
        });
    },
    Write() {
      // 写入 JCL
      this.$http
        .put("/api/sms/writeds", {
          dsName: this.$store.state.ispf.dsMember,
          jclList: this.jclText.split("\n")
        })
        .then(() => {
          this.$message.success("Saved");
        })
        .catch(err => {
          this.$message.error("请求错误：" + err.message);
        });
    },
    Submit() {
      // 提交 JCL
      this.$http
        .put("/api/sms/subjob", {
          jclList: this.jclText.split("\n")
        })
        .then(res => {
          this.$message.info("Job " + res.data.jobid + " Submitted");
          this.jclResult(res.data);
        })
        .catch(err => {
          this.$message.error("请求错误：" + err.message);
        });
    },
    Command() {
      if (this.cmd.toUpperCase() === "SUBMIT") {
        this.Write();
        this.Submit();
      } else
        this.$message.error("Command " + this.cmd.toUpperCase() + " Not Found");
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
