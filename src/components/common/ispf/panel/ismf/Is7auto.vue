<template>
  <div class="master-panel">
    <h3 class="panel-title">ACS APPLICATION SELECTION</h3>
    <div class="panel-content">
      <a-row>
        <a-input
          v-focus
          class="panel-option"
          addonBefore="Select one of the following options:"
          v-model="option"
        ></a-input>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">1</a-col>
        <a-col :span="5" class="panel-name">Edit</a-col>
        <a-col :span="17" class="panel-desc"
          >- Edit ACS Routine source code</a-col
        >
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">2</a-col>
        <a-col :span="5" class="panel-name">Translate</a-col>
        <a-col :span="17" class="panel-desc"
          >- Translate ACS Routines to ACS Object Form</a-col
        >
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">3</a-col>
        <a-col :span="5" class="panel-name">Validate</a-col>
        <a-col :span="17" class="panel-desc"
          >- Validate ACS Routines Against Storage Constructs</a-col
        >
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">4</a-col>
        <a-col :span="5" class="panel-name">Test</a-col>
        <a-col :span="17" class="panel-desc"
          >- Define/Alter Test Cases and Test ACS Routines</a-col
        >
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">5</a-col>
        <a-col :span="5" class="panel-name">Display</a-col>
        <a-col :span="17" class="panel-desc"
          >- Display ACS Object Information</a-col
        >
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">6</a-col>
        <a-col :span="5" class="panel-name">Delete</a-col>
        <a-col :span="17" class="panel-desc"
          >- Delete an ACS Object from a Source Control Data Set</a-col
        >
      </a-row>
      <br />
      <a-row class="panel-name">If Display Option is Chosen, Specify:</a-row>
      <a-row>
        <a-col :offset="1">
          <a-input
            class="panel-option"
            addonBefore="CDS Name"
            v-model="cdsName"
            @keyup.enter="Option"
          ></a-input>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: "",
      cdsName: ""
    };
  },

  methods: {
    Option() {
      if (this.cdsName.length == 0 || this.option.length == 0)
        this.$message.error("Enter required field");
      else if (this.option.toUpperCase() == "2") {
        this.$router.push({
          path: "7/2",
          query: {
            cdsName: this.cdsName.toUpperCase()
          }
        });
      } else if (this.option.toUpperCase() == "3") {
        this.$http
          .post("/api/sms/ismf/12/1")
          .then(res => {
            console.log("'/sms/ismf/12' Success: ", res);
            this.$message.success("成功");
          })
          .catch(err => {
            console.log("Get '/sms/ismf/12' Error: ", err);
          });
      }
    }
  }
};
</script>

<style scoped></style>
