<template>
  <div>
    <h2>
      控制台
      <p style="color:red;font-size:10px">{{ info }}</p>
    </h2>
    <a-form :form="form" layout="vertical" @submit="handleSubmit">
      <a-form-item>
        <a-textarea
          placeholder="输入命令，回车提交"
          v-decorator="['code']"
          autosize
          @change="handleChange"
        />
        <a-button type="primary" html-type="submit">
          Submit
        </a-button>
      </a-form-item>
      <!-- <a-form-item>
        <a-button type="primary" html-type="submit" :loading="isLoading">
          提交
        </a-button>
      </a-form-item> -->
    </a-form>
    <a-collapse v-model="activeKey" class="pre">
      <a-collapse-panel header="JESMSGLG" key="1">
        <pre>{{ result.jesmsglg }}</pre>
      </a-collapse-panel>
      <a-collapse-panel header="JESYSMSG" key="2">
        <pre>{{ result.jesysmsg }}</pre>
      </a-collapse-panel>
      <a-collapse-panel header="SYSPRINT" key="3">
        <pre>{{ result.sysprint }}</pre>
      </a-collapse-panel>
      <a-collapse-panel header="JESJCL" key="4">
        <pre>{{ result.jesjcl }}</pre>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    result: {
      type: Object,
      default: function() {
        return { jesmsglg: "", jesysmsg: "", sysprint: "", jesjcl: "" };
      }
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      activeKey: [""],
      iftrue: true,
      info: "",
      key: true
    };
  },

  methods: {
    handleSubmit(e) {
      this.handleChange(e);
      e.preventDefault();
      this.result = "";
      // console.log("command submit");
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log("Received values of form: ", values.code);
          this.$http
            .put("/api/catalog", values.code)
            .then(response => {
              // console.log(response);
              this.result = response.body;
            })
            .catch(() => {
              alert("至少写的像个JCL吧！");
            });
        }
      });
      this.$emit("submit", this.form.getFieldsValue().code);
      this.activeKey = ["1"];
    },
    handleChange() {
      document.onkeydown = this.whichkey;
      var iftrue = true;
      var whichline = "";
      this.form.validateFields((err, values) => {
        if (!err) {
          var arr = values.code.split("\n"); //首先我们要为验证行数，通过分行符“\n”
          var loop = 0;
          for (; loop < arr.length; loop++) {
            if (arr[loop].length >= 80) {
              if (this.key == false) {
                if (arr[loop].length >= 82) {
                  whichline += loop + 1 + "、";
                  iftrue = false;
                }
              } else {
                whichline += loop + 1 + "、";
                iftrue = false;
              }
            }
          }
          if (iftrue == true) {
            this.info = "";
          } else {
            this.info = "第" + whichline + "行长度超过80！（包括空格）";
          }
        }
        this.iftrue = iftrue;
      });
    },
    whichkey(e) {
      if (e.keyCode == 8) this.key = false;
      else this.key = true;
    }
  }
};
</script>

<style>
.pre {
  padding: 1em;
  margin: 1em 0 !important;

  border: 1px solid #ddd;
}
pre {
  background-color: #eee;
  padding: 1em;
  margin: 1em 0 !important;

  border: 1px solid #ddd;
}
</style>
