<template>
  <div style="height: 100%" id="teach_check_page">
    <div class="header">
      <h2>
        <span class="back-button" @click="$router.go(-1)">
          <a-icon type="left" />返回
        </span>
        <span style="vertical-align: middle"
          >{{ lab.toUpperCase() }} / {{ uid }}</span
        >
      </h2>
    </div>
    <div class="wrapper">
      <div class="pdf">
        <a-spin
          size="large"
          :spinning="isLoadingPDF"
          :style="{ height: '100%' }"
        >
          <a-icon slot="indicator" type="loading-3-quarters" :spin="true" />
          <embed :src="url" type="application/pdf" width="100%" height="100%" />
        </a-spin>
      </div>
      <div class="check">
        <a-form :form="form">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="分数"
          >
            <a-input-number
              :min="0"
              :max="100"
              v-decorator="[
                'score',
                { rules: [{ required: true, message: '分数不能为空' }] }
              ]"
            />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="评价"
          >
            <a-textarea
              :rows="5"
              v-decorator="[
                'comment',
                { rules: [{ max: 140, message: '字数限制在 140 字以内' }] }
              ]"
            />
          </a-form-item>
          <a-row>
            <a-col :span="24" :style="{ textAlign: 'right' }">
              <a-button @click="$router.go(-1)">返回</a-button>
              <a-button
                type="primary"
                :loading="isSaving"
                @click="save"
                :style="{ marginLeft: '8px' }"
                >保存</a-button
              >
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { setTimeout } from "timers";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const formTailLayout = {
  // labelCol: { span: 4 },
  wrapperCol: { offset: 8 }
};
export default {
  data() {
    return {
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this),
      isLoadingPDF: true, // 是否正在加载 pdf
      isSaving: false // 是否正在保存分数和评论
    };
  },
  computed: {
    ...mapState("report", ["score", "comment", "uid", "url", "lab"])
  },
  mounted() {
    this.form.setFieldsValue({
      score: this.score,
      comment: this.comment
    });
    setTimeout(() => {
      this.isLoadingPDF = false;
    }, 1000);
  },
  methods: {
    save() {
      this.isSaving = true;
      this.$http
        .post(`/api/db/subScore`, {
          uid: this.uid,
          score: this.form.getFieldValue("score"),
          comment: this.form.getFieldValue("comment"),
          lab: this.lab
        })
        .then(() => {
          this.isSaving = false;
          this.$message.success("保存成功");
        })
        // .then()
        .catch(() => {
          this.isSaving = false;
          this.$message.error("保存失败");
        });
    }
  }
};
</script>

<style lang="scss">
#teach_check_page {
  .header {
    .back-button {
      color: gray;
      font-size: 14px;
      vertical-align: middle;
      margin-right: 4px;
      cursor: pointer;
    }
  }
  .wrapper {
    display: flex;
    width: 100%;
    height: 95%;
  }
  .pdf {
    height: 100%;
    flex: 3;
  }
  .check {
    height: 100%;
    flex: 1;
  }
  .ant-spin-container {
    height: 100%;
  }
}
</style>
