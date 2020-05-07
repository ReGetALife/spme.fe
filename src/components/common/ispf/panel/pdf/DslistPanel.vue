<template>
  <div>
    <h3 class="panel-title">
      DSLIST - Data Sets Matching {{ this.$store.state.ispf.dsnLevel }}
    </h3>
    <a-spin size="large" :spinning="isLoading">
      <a-icon slot="indicator" type="loading-3-quarters" :spin="true" />

      <a-table
        :columns="columns"
        :dataSource="datasets"
        class="panel-table"
        rowKey="dsname"
      >
        <template slot="cmdTitle">
          Command
          <a-popover>
            <template slot="content">
              Support 'V', 'E' and 'D'
            </template>
            <a-icon type="question-circle" style="cursor: pointer" />
          </a-popover>
        </template>
        <template slot="cmd" slot-scope="{ dsname, dsorg }">
          <a-input @keyup.enter="onEnter({ dsname, dsorg }, $event)" />
        </template>
        <template slot="dsorg" slot-scope="{ dsorg }">
          <span v-if="dsorg && dsorg === 'PO'">Partitioned</span>
          <span v-if="dsorg && dsorg === 'PO-E'">Partitioned Extended</span>
          <span v-if="dsorg && dsorg === 'PS'">Sequential</span>
        </template>
      </a-table>
    </a-spin>
    <a-modal
      :title="`确定删除 ${selectedDatasetName} 吗？`"
      v-model="visible"
      @ok="deleteDataset(selectedDatasetName)"
      :confirmLoading="isDeleting"
    >
      注意：删除数据集后将不能恢复！
    </a-modal>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "dslist-panel",
  data() {
    return {
      columns: [
        {
          slots: { title: "cmdTitle" },
          key: "cmd",
          width: 150,
          scopedSlots: { customRender: "cmd" }
        },
        {
          title: "Dataset Name",
          dataIndex: "dsname",
          width: 400
        },
        {
          title: "Type",
          key: "dsorg",
          scopedSlots: { customRender: "dsorg" }
        },
        { title: "Volume", dataIndex: "vol" },
        { title: "Catalog Name", dataIndex: "catnm" }
      ],
      datasets: [],
      isLoading: true,
      visible: false,
      selectedDatasetName: "",
      isDeleting: false
    };
  },
  activated() {
    this.getDsList();
  },
  methods: {
    getDsList() {
      this.isLoading = true;
      Axios.get(`/api/dataset?pattern=${this.$store.state.ispf.dsnLevel}`)
        .then(res => {
          this.datasets = res.data;
        })
        .catch(err => {
          this.$message.error("请求错误：" + err.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    deleteDataset(datasetName) {
      if (datasetName) {
        this.isDeleting = true;
        Axios.delete(`/api/dataset/${datasetName}`)
          .then(() => {
            this.$message.success("数据集 " + datasetName + " 删除成功");
          })
          .catch(e => {
            this.$message.error("发生错误：" + e.message);
          })
          .finally(() => {
            this.isDeleting = false;
            this.visible = false;
            this.getDsList();
          });
      }
    },

    onEnter({ dsname, dsorg }, event) {
      let cmd = event.target.value;
      if (!cmd) {
        return;
      }
      cmd = cmd.toUpperCase();

      const panel =
        dsorg === "PO" || dsorg === "PO-E" ? "p_3_4_blank_e" : "edit";
      switch (cmd) {
        case "V":
          this.$store.commit("ispf/SET_DSN", dsname);
          this.$store.commit("ispf/SET_DS_MEMBER", dsname);
          this.$store.commit("ispf/SET_EDIT_MODE", "view");
          this.$store.commit("ispf/SET_PANEL", panel);
          break;
        case "E":
          this.$store.commit("ispf/SET_DSN", dsname);
          this.$store.commit("ispf/SET_DS_MEMBER", dsname);
          this.$store.commit("ispf/SET_EDIT_MODE", "edit");
          this.$store.commit("ispf/SET_PANEL", panel);
          break;
        case "D":
          this.selectedDatasetName = dsname;
          this.visible = true;
          break;
        default:
          this.$message.warn("暂不支持该操作");
      }
    }
  }
};
</script>

<style></style>
