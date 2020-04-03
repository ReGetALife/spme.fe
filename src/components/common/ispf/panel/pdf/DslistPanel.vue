<template>
  <div>
    <h3 class="panel-title">
      DSLIST - Data Sets Matching {{ this.$store.state.ispf.dsnLevel }}
    </h3>
    <a-table :columns="columns" :dataSource="datasets" class="panel-table">
      <a slot="cmd" slot-scope="record">
        <a-popover title="Enter you command" trigger="click">
          <a slot="content">
            <a-input @keyup.enter="onEnter(record.key)" v-model="cmd" />
          </a>
          <a-button type="primary" width="10"><a-icon type="edit"/></a-button>
        </a-popover>
      </a>
    </a-table>
  </div>
</template>

<script>
export default {
  name: "dslist-panel",
  data() {
    return {
      columns: [
        {
          title: "Dataset",
          dataIndex: "dsname",
          width: 400
        },
        {
          title: "Cmd",
          key: "cmd",
          scopedSlots: { customRender: "cmd" }
        }
      ],
      datasets: [],
      cmd: ""
    };
  },
  created() {
    this.getDsList();
  },
  methods: {
    getDsList() {
      this.$http
        .get(`/api/sms/getdslist?dsName=${this.$store.state.ispf.dsnLevel}`)
        .then(res => {
          this.datasets = res.data.items;

          for (let i = 0; i < this.datasets.length; i++)
            this.datasets[i].key = i;
        })
        .catch(err => {
          this.$message.error("请求错误：" + err.message);
        });
    },
    // dsType(dsname) {
    //   this.$http
    //     .get(`/api/sms/getpdsmemberlist?dsName=${dsname}`)
    //     .then(res => {
    //       console.log(
    //         "PdslistPanel Get '/sms/getpdsmemberlist' Success: ",
    //         res
    //       );
    //       this.type = 1; // 分区数据集
    //     })
    //     .catch(err => {
    //       // 请求成员错误，顺序数据集
    //       console.log("PdslistPanel Get '/sms/getpdsmemberlist' Error: ", err);
    //       this.type = 0;
    //     });
    // },
    onEnter(key) {
      if (this.cmd.toUpperCase() === "D") {
        // 删除数据集（顺序和分区）
        this.$http
          .delete(`/api/sms/deleteds?dsName=${this.datasets[key].dsname}`)
          .then(() => {
            this.$message.success(
              "Dataset " + this.datasets[key].dsname + " deleted"
            );
            this.getDsList();
          })
          .catch(err => {
            this.$message.error("请求错误：" + err.message);
          });
      } else if (this.cmd.toUpperCase() === "E") {
        this.$store.commit(
          "ispf/SET_DSN",
          this.datasets[key].dsname.toUpperCase().trim()
        );
        this.$store.commit("SET_PANEL", "p_3_4_blank_e");
      }
    }
  }
};
</script>

<style></style>
