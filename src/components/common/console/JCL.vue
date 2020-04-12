<template>
  <div>
    <a-form :form="form" layout="vertical" @submit="handleSubmit">
      <a-form-item>
        <a-textarea
          :autosize="{ minRows: 5 }"
          placeholder="请输入 JCL 代码"
          v-decorator="[
            'jcl',
            {
              rules: [
                { required: true, message: '请输入 JCL 代码' },
                { validator: jclValidator }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="isLoading">
          提交
        </a-button>
        <a-popover style="margin-left: 20px; cursor: pointer">
          <template slot="content">
            <p>JCL 中每行不能超过 72 个字符，超出的部分会被忽略哦。</p>
            <p>至于其他的，请参考 JCL 的语法规则 🙈。</p>
          </template>
          JCL 怎么写
          <a-icon type="question-circle" />
        </a-popover>
      </a-form-item>
    </a-form>
    <a-collapse :bordered="false" v-if="result">
      <a-collapse-panel
        v-for="item in result"
        :key="item.id"
        :header="item.ddName"
      >
        <pre v-if="item.output">{{ item.output }}</pre>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      isLoading: false,
      result: null
    };
  },

  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields }
      } = this;

      validateFields(async (errors, values) => {
        if (errors) return;
        this.isLoading = true;
        try {
          const response = await Axios.post("/api/jcl", {
            jcl: values.jcl
          });
          if (response.status === 200) {
            this.result = response.data;
          } else {
            this.$message.warn("命令已提交，但服务器响应超时了 😥").then();
          }
        } catch (error) {
          this.$message.error("JCL 执行失败：" + error.message).then();
        } finally {
          this.isLoading = false;
        }
      });
    },

    jclValidator(rule, value, callback) {
      const lines = (value && value.split("\n")) || [];
      for (const l of lines) {
        if (l.length > 72) {
          callback("每行不能超过 72 个字符 😅");
        }
      }
      // always call callback. ref: https://github.com/ant-design/ant-design/issues/5155
      callback();
    }
  }
};
</script>
