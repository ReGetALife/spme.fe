<template>
  <div class="pdalist-panel">
    <h3 class="panel-title">
      {{ this.$store.state.ispf.editMode.toUpperCase() }}
      {{ this.$store.state.ispf.dataSetName }}
    </h3>

    <a-spin size="large" :spinning="isLoading">
      <a-icon slot="indicator" type="loading-3-quarters" :spin="true" />

      <a-table :columns="columns" :dataSource="members" rowKey="name">
        <template slot="cmdTitle">
          Option
          <a-popover>
            <template slot="content">
              Support 'V', 'E' and 'D' in edit mode. <br />
              Support 'V' and 'E' in view mode.
            </template>
            <a-icon type="question-circle" style="cursor: pointer" />
          </a-popover>
        </template>
        <template slot="cmd" slot-scope="{ name }">
          <a-input @keyup.enter="onEnter(name, $event)" />
        </template>
      </a-table>
    </a-spin>

    <a-input
      addonBefore="Command >"
      @keyup.enter="commandLine"
      placeholder="Support 'S [Member Name]' in edit mode"
      v-model="cmdLine"
    />

    <a-modal
      :title="`确定删除 ${selectedMemberName} 吗？`"
      v-model="visible"
      @ok="deleteMember(selectedMemberName)"
      :confirmLoading="isDeleting"
    >
      注意：删除成员后将不能恢复！
    </a-modal>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "pdslist-panel",
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
          title: "Member Name",
          dataIndex: "name"
        }
      ],
      members: [],
      cmdLine: "",
      isLoading: true,
      visible: false,
      selectedMemberName: "",
      isDeleting: false
    };
  },
  activated() {
    this.getPdsMemList();
  },
  methods: {
    getPdsMemList() {
      this.isLoading = true;
      Axios.get(`/api/dataset/${this.$store.state.ispf.dataSetName}/member`)
        .then(res => {
          this.members = res.data.map(n => {
            return { name: n };
          });
        })
        .catch(err => {
          this.$message.error("请求错误：" + err.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    deleteMember(memberName) {
      if (memberName) {
        this.isDeleting = true;
        Axios.delete(
          `/api/dataset/${this.$store.state.ispf.dataSetName}(${memberName})`
        )
          .then(() => {
            this.$message.success("成员 " + memberName + " 删除成功");
          })
          .catch(e => {
            this.$message.error("发生错误：" + e.message);
          })
          .finally(() => {
            this.isDeleting = false;
            this.visible = false;
            this.getPdsMemList();
          });
      }
    },

    onEnter(name, event) {
      let cmd = event.target.value;
      if (!cmd) {
        return;
      }
      cmd = cmd.toUpperCase();

      switch (cmd) {
        case "V":
          this.$store.commit(
            "ispf/SET_DS_MEMBER",
            `${this.$store.state.ispf.dataSetName}(${name})`
          );
          this.$store.commit("ispf/SET_EDIT_MODE", "view");
          this.$store.commit("ispf/SET_PANEL", "edit");
          break;
        case "E":
          this.$store.commit(
            "ispf/SET_DS_MEMBER",
            `${this.$store.state.ispf.dataSetName}(${name})`
          );
          this.$store.commit("ispf/SET_EDIT_MODE", "edit");
          this.$store.commit("ispf/SET_PANEL", "edit");
          break;
        case "D":
          if (this.$store.state.ispf.editMode === "view") {
            this.$message.warn("View 模式下不能删除成员");
          } else {
            this.selectedMemberName = name;
            this.visible = true;
          }
          break;
        default:
          this.$message.warn("暂不支持该操作");
      }
    },

    commandLine() {
      const cmd = this.cmdLine && this.cmdLine.trim().toUpperCase();
      if (cmd && cmd[0] === "S") {
        if (this.$store.state.ispf.editMode === "view") {
          this.$message.warn("View 模式下不能创建成员");
          return;
        }
        let arr = cmd.replace(/ +/g, " ").split(" ");
        if (arr.length < 2) {
          this.$message.warn("请指定 Member Name");
          return;
        }
        const memName = arr[1];
        // 创建分区数据集成员
        this.$store.commit(
          "ispf/SET_DS_MEMBER",
          this.$store.state.ispf.dataSetName + "(" + memName + ")"
        );
        this.$store.commit("ispf/SET_EDIT_MODE", "edit");
        this.$store.commit("ispf/SET_PANEL", "edit");
      } else {
        this.$message.warn("暂不支持该操作");
      }
    }
  }
};
</script>
