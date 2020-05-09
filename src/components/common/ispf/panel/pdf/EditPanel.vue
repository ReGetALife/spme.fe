<template>
  <div class="master-panel">
    <h3 class="panel-title">
      {{ this.$store.state.ispf.editMode.toUpperCase() }}
      {{ this.$store.state.ispf.dsMember }}
    </h3>
    <a-spin size="large" :spinning="isLoading">
      <a-icon slot="indicator" type="loading-3-quarters" :spin="true" />

      <a-textarea class="panel-text" :rows="15" v-model="text" />
    </a-spin>

    <br />
    <br />

    <a-input
      class="panel-option"
      addonBefore="Command >"
      placeholder="Support 'SAVE' in edit mode and 'SUBMIT(SUB)' in both mode"
      @keyup.enter="onEnter"
      v-model="cmd"
    />
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "edit-panel",
  data() {
    return {
      cmd: "",
      text: "",
      isLoading: true
    };
  },
  activated() {
    this.getContent();
  },
  methods: {
    getContent() {
      this.text = "";
      this.isLoading = true;
      Axios.get(`/api/dataset/${this.$store.state.ispf.dsMember}`)
        .then(res => {
          this.text = res.data;
        })
        .catch(err => {
          this.$message.error("请求错误：" + err.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    writeContent() {
      this.isLoading = true;
      // axios will use "application/x-www-form-urlencoded" as default content type if data is a string
      // so it needs to be explicitly set
      Axios.put("/api/dataset/" + this.$store.state.ispf.dsMember, this.text, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(() => {
          this.$message.success("保存成功");
        })
        .catch(err => {
          this.$message.error("请求错误：" + err.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    submitJob() {
      this.isLoading = true;
      Axios.post("/api/jcl", {
        jcl: this.text
      })
        .then(res => {
          if (res.status === 202) {
            this.$message.warn("主机执行 Job 超时了");
          }
          this.showJobResult(res.data);
        })
        .catch(err => {
          this.$message.error("请求错误：" + err.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    onEnter() {
      let cmd = this.cmd.trim().toUpperCase();
      switch (cmd) {
        case "SUB":
          this.submitJob();
          break;
        case "SUBMIT":
          this.submitJob();
          break;
        case "SAVE":
          if (this.$store.state.ispf.editMode === "view") {
            this.$message.warn("View 模式下不能保存更改");
          } else {
            this.writeContent();
          }
          break;
        default:
          this.$message.warn("暂不支持该操作");
      }
    },
    showJobResult(result) {
      if (result.length > 0) {
        const h = this.$createElement;
        this.$info({
          title: `${result[0].jobId} ${result[0].jobName} 执行结果`,
          width: 800,
          content: h("div", {}, [
            ...result.map(e => {
              return h("pre", e.output);
            })
          ]),
          onOk() {}
        });
      }
    }
  }
};
</script>

<style scoped>
.panel-text {
  /* 等宽字体！非常重要！让对齐成为可能 */
  font-family: "Courier New", Courier, monospace;
  white-space: nowrap;
  overflow-x: auto;
  background-color: black;
  color: greenyellow;
}
</style>
