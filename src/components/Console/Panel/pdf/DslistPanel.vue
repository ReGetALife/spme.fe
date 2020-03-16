<template>
  <div>
    <h3 class="panel-title">
      DSLIST - Data Sets Matching {{ this.$route.query.dsn }}
    </h3>
    <a-table :columns="columns" :dataSource="datasets" class="panel-table">
      <a slot="cmd" slot-scope="record">
        <a-popover title="Enter you command" trigger="click">
          <a slot="content">
            <a-input @keyup.enter="Command(record.key)" v-model="cmd" />
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
        .get(`/api/sms/getdslist?dsName=${this.$route.query.dsn}`)
        .then(res => {
          // console.log("DslistPanel Get '/sms/getdslist' Success: ", res);
          this.datasets = res.data.items;

          for (let i = 0; i < this.datasets.length; i++)
            this.datasets[i].key = i;
        })
        .catch(err => {
          console.log("DslistPanel Get '/sms/getdslist' Error: ", err);
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
    Command(key) {
      // console.log(key, this.cmd)
      if (this.cmd.toUpperCase() == "D") {
        // 删除数据集（顺序和分区）
        this.$http
          .delete(`/api/sms/deleteds?dsName=${this.datasets[key].dsname}`)
          .then(res => {
            console.log("DslistPanel Delete '/sms/deleteds' 请求成功：", res);
            this.$message.success(
              "Dataset " + this.datasets[key].dsname + " deleted"
            );
            this.getDsList();
          })
          .catch(err => {
            console.log("DslistPanel Delete '/sms/deleteds' 请求错误：", err);
          });
      } else if (this.cmd.toUpperCase() == "E") {
        this.$router.push({
          path: "pdslist",
          query: {
            dsn: this.datasets[key].dsname
          }
        });
      }
    }
  }
};
</script>

<style></style>
