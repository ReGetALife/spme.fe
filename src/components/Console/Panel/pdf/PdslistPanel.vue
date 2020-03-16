<template>
  <div class="pdalist-panel">
    <!-- <hr /> -->
    <h3 class="panel-title">EDIT {{ this.$route.query.dsn }}</h3>

    <a-table :columns="columns" :dataSource="datasets">
      <a slot="cmd" slot-scope="record">
        <a-popover title="Enter you command" trigger="click">
          <a slot="content">
            <a-input @keyup.enter="Command(record.key)" v-model="cmd" />
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
        .get(`/api/sms/getpdsmemberlist?dsName=${this.$route.query.dsn}`)
        .then(res => {
          // console.log(
          //   "PdslistPanel Get '/sms/getpdsmemberlist' Success: ",
          //   res
          // );
          this.datasets = res.data.items;
          for (let i = 0; i < this.datasets.length; i++)
            this.datasets[i].key = i;
        })
        .catch(err => {
          console.log("PdslistPanel Get '/sms/getpdsmemberlist' Error: ", err);
        });
    },

    Command(key) {
      // console.log(key, this.cmd)
      if (this.cmd.toUpperCase() == "D") {
        // 删除数据集成员
        this.$http
          .delete(
            "/api/sms/deletepdsmember?dsName=" +
              this.$route.query.dsn +
              "(" +
              this.datasets[key].member +
              ")"
          )
          .then(res => {
            console.log(
              "PdslistPanel Delete '/sms/deletepdsmember' 请求成功：",
              res
            );
            this.$message.success(
              "Member " + this.datasets[key].member + " deleted"
            );
            this.getPdsMemList();
          })
          .catch(err => {
            console.log(
              "PdslistPanel Delete '/sms/deletepdsmember' 请求错误：",
              err
            );
          });
      } else if (this.cmd.toUpperCase() == "E") {
        this.$router.push({
          path: "jcl",
          query: {
            dsn: this.$route.query.dsn + "(" + this.datasets[key].member + ")"
          }
        });
      }
    },

    commandLine() {
      if (this.cmdLine[0].toUpperCase() == "S") {
        var memName = this.cmdLine.split(" ")[1].toUpperCase();
        // 创建分区数据集成员
        this.$router.push({
          path: "jcl",
          query: {
            dsn: this.$route.query.dsn + "(" + memName + ")"
          }
        });
      }
    }
  }
};
</script>
