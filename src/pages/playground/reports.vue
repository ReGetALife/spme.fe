<template>
  <div>
    <h1>我的实验</h1>
    <a-table :columns="columns" :dataSource="data" rowKey="name">
      <span slot="status" slot-scope="{ status }">
        <a-badge :status="status | statusFilter" />
        {{ status | statusFilter2 }}
      </span>
      <!-- <span slot="action" slot-scope="text, record"> -->
      <span slot="action" slot-scope="record">
        <a :href="record.url" target="_blank" :disabled="!record.url">
          <a-icon type="eye" />&nbsp;预览
        </a>
        <a-divider type="vertical" />
        <a
          :href="record.url"
          :download="record.disposition"
          :disabled="!record.url"
        >
          <a-icon type="download" />&nbsp;下载
        </a>
        <!-- <a-divider type="vertical" /> -->
        <!-- <a-button type="primary" :disabled="record.status !== 0">提交所有</a-button> -->
      </span>
    </a-table>
  </div>
</template>

<script>
const columns = [
  { title: "实验名称", dataIndex: "name", key: "name" },
  { title: "实验状态", key: "status", scopedSlots: { customRender: "status" } },
  { title: "评分", dataIndex: "score" },
  { title: "评语", dataIndex: "comment", width: "300px" },
  {
    title: "操作",
    key: "action",
    // dataIndex: 'action',
    scopedSlots: { customRender: "action" }
  }
];

const data = [
  {
    name: "安全管理（RACF）",
    labId: "racf",
    status: "",
    score: "",
    comment: ""
  },
  {
    name: "存储管理（DFSMS）",
    labId: "sms",
    status: "",
    score: "",
    comment: ""
  },
  {
    name: "目录管理（Catalog）",
    labId: "catalog",
    status: "",
    score: "",
    comment: ""
  },
  {
    name: "系统命令（MVS）",
    labId: "mvs",
    status: "",
    score: "",
    comment: ""
  },
  {
    name: "脚本语言（REXX）",
    labId: "rexx",
    status: "",
    score: "",
    comment: ""
  }
];

export default {
  data() {
    return {
      columns,
      data,
      allRates: []
    };
  },
  async created() {
    // 获取提交状态
    let labStatus = await this.$http.get("/api/db/getLabStatus");
    this.data.forEach((item, index, arr) => {
      let status = labStatus.body.find(
        lab => lab.lab.toLowerCase() === item.labId
      ).status;
      arr[index].status = status;
    });

    // 获取分数（若已经批改）
    this.allRates = await this.$http.get("/api/db/checkScore").catch(() => {});

    this.data.forEach(lab => {
      this.$http
        .get("/api/db/getReports", {
          params: {
            lab: lab.labId.toUpperCase()
          },
          responseType: "arraybuffer"
        })
        .then(res => {
          if (res.data.byteLength) {
            // 生成 pdf url
            // console.log(res);
            // lab.status = 1; // 已提交
            lab.disposition = res.headers.map["content-disposition"][0]
              .split("=")[1]
              .replace(/"/g, "");
            // console.log("dis", lab.disposition);
            let binaryData = [];
            // console.log("body", res.body);
            binaryData.push(res.body);

            lab.url = window.URL.createObjectURL(
              new Blob(binaryData, {
                type: "application/pdf"
              })
            );

            this.data = [...this.data]; // 更新数据

            // console.log("url", lab.url);

            // 是否批改
            // console.log("allrates", this.allRates);
            if (this.allRates && +this.allRates.status === 200) {
              let ratedLabIndex = this.allRates.body.findIndex(rate => {
                return rate.lab.toLowerCase() === lab.labId;
              });
              if (ratedLabIndex !== -1) {
                lab.comment = this.allRates.body[ratedLabIndex].comment;
                lab.score = this.allRates.body[ratedLabIndex].score;
                lab.status = "scored";
              }
            }
          } else {
            // lab.status = 0; // 未提交
          }
        });
    });
  },
  methods: {},
  filters: {
    statusFilter(status) {
      switch (status) {
        case "unsaved":
          return "default"; // 未保存
        case "saved":
          return "warning"; // 已保存
        case "submitted":
          return "processing"; // 已提交
        case "scored":
          return "success"; // 已批改
      }
    },
    statusFilter2(status) {
      switch (status) {
        case "unsaved":
          return "未保存";
        case "saved":
          return "已保存";
        case "submitted":
          return "已提交";
        case "scored":
          return "已批改";
        default:
          return "状态未知";
      }
    }
  }
};
</script>
