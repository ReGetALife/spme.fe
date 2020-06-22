<template>
  <div>
    <a-form :form="form" @submit="handleSubmit" layout="vertical">
      <a-form-item>
        <span slot="label">
          JCL 代码
          <a-popover style="cursor: pointer">
            <template slot="content">
              <p>JCL 中每行不能超过 72 个字符，超出的部分会被忽略哦。</p>
              至于其他的，请参考 JCL 的语法规则 🙈。
            </template>
            <a-icon type="question-circle" />
          </a-popover>
        </span>
        <a-textarea
          :autosize="{ minRows: 5 }"
          name="myTextArea"
          placeholder="请输入 JCL 代码"
          v-decorator="[
            'jcl',
            {
              rules: [
                { required: true, message: '请输入JCL代码' },
                { validator: this.jclValidator }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item>
        <a-button-group>
          <a-button
            :loading="isLoading"
            @click="cleanText()"
            icon="edit"
            default
          >
            清空JCL
          </a-button>
          <a-button
            :loading="isLoading"
            html-type="submit"
            icon="caret-up"
            type="primary"
          >
            提交JCL
          </a-button>
        </a-button-group>
      </a-form-item>
    </a-form>

    <a-upload-dragger
      :multiple="true"
      @change="handleChange"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      name="file"
    >
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox" />
      </p>
      <p class="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p class="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p>
    </a-upload-dragger>

    <a-collapse :bordered="false" v-if="result">
      <a-collapse-panel
        :header="item.ddName"
        :key="item.id"
        v-for="item in result"
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

  beforeCreate() {
    // 读取文件
    FileReader.prototype.reading = function({ encode } = pms) {
      let bytes = new Uint8Array(this.result); //无符号整型数组
      let text = new TextDecoder(encode || "UTF-8").decode(bytes);
      return text;
    };
    /* 重写readAsBinaryString函数 */
    FileReader.prototype.readAsBinaryString = function(f) {
      if (!this.onload)
        //如果this未重写onload函数，则创建一个公共处理方式
        this.onload = e => {
          //在this.onload函数中，完成公共处理
          let rs = this.reading();
          console.log(rs);
        };
      this.readAsArrayBuffer(f); //内部会回调this.onload方法
    };
  },

  methods: {
    cleanText() {
      this.form.resetFields();
    },
    read(f) {
      let rd = new FileReader();
      rd.onload = e => {
        //this.readAsArrayBuffer函数内，会回调this.onload函数。在这里处理结果
        let cont = rd.reading({ encode: "GBK" });
        console.log(cont);
        this.form.setFieldsValue({
          jcl: cont
        });
      };
      rd.readAsBinaryString(f);
    },

    handleChange(info) {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
        console.log("成功加载文件");
        this.read(info.file.originFileObj);
      } else if (status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },

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
            this.$message.success("Job 执行成功").then();
          } else {
            this.$message.warn("Job 已提交，但服务器响应超时了 😥").then();
          }
        } catch (error) {
          this.$message.error("发生错误：" + error.message).then();
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
