<template>
  <div class="pdalist-panel">
    <h3 class="panel-title">EDIT {{ this.$store.state.ispf.dataSetName }}</h3>

    <a-table :columns="columns" :dataSource="datasets">
      <a slot="cmd" slot-scope="record">
        <a-popover title="Enter you command" trigger="click">
          <a slot="content">
            <a-input @keyup.enter="onEnter(record.key)" v-model="cmd" />
          </a>
          <a-button type="primary" width="10"><a-icon type="edit"/></a-button>
        </a-popover>
      </a>
    </a-table>

    <a-input
      addonBefore="Command >"
      @keyup.enter="commandLine"
      v-model="cmdLine"
    />

    <hr />
  </div>
</template>

<script>
export default {
  name: "pdslist-panel",
  data() {
    return {
      columns: [
        {
          title: "Name",
          dataIndex: "member",
          width: 400
        },
        {
          title: "Cmd",
          key: "cmd",
          scopedSlots: { customRender: "cmd" }
        }
      ],
      datasets: [],
      cmd: "",
      cmdLine: ""
    };
  },
  created() {
    this.getPdsMemList();
  },
  methods: {
    getPdsMemList() {
      this.$http
        .get(
          `/api/sms/getpdsmemberlist?dsName=${
            this.$store.state.ispf.dataSetName
          }`
        )
        .then(res => {
          this.datasets = res.data.items;
          for (let i = 0; i < this.datasets.length; i++)
            this.datasets[i].key = i;
        })
        .catch(err => {
          this.$message.error("请求错误：" + err.message);
        });
    },

    onEnter(key) {
      if (this.cmd.toUpperCase() === "D") {
        // 删除数据集成员
        this.$http
          .delete(
            "/api/sms/deletepdsmember?dsName=" +
              this.$store.state.ispf.dataSetName +
              "(" +
              this.datasets[key].member +
              ")"
          )
          .then(() => {
            this.$message.success(
              "Member " + this.datasets[key].member + " deleted"
            );
            this.getPdsMemList();
          })
          .catch(err => {
            this.$message.error("请求错误：" + err.message);
          });
      } else if (this.cmd.toUpperCase() === "E") {
        this.$store.commit(
          "ispf/SET_DS_MEMBER",
          this.$store.state.ispf.dataSetName +
            "(" +
            this.datasets[key].member +
            ")"
        );
        this.$store.commit("ispf/SET_PANEL", "edit");
      }
    },

    commandLine() {
      if (this.cmdLine && this.cmdLine[0].toUpperCase() === "S") {
        let arr = this.cmdLine
          .trim()
          .replace(/ +/g, " ")
          .split(" ");
        if (arr.length < 2) {
          this.$message.warn("请指定 Member Name");
          return;
        }
        const memName = arr[1].toUpperCase();
        // 创建分区数据集成员
        this.$store.commit(
          "ispf/SET_DS_MEMBER",
          this.$store.state.ispf.dataSetName + "(" + memName + ")"
        );
        this.$store.commit("ispf/SET_PANEL", "edit");
      }
    }
  }
};
</script>
