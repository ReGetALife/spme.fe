<template>
  <div class="master-panel">
    <h3 class="panel-title">CDS APPLICATION SELECTION</h3>
    <div class="panel-content">
      <a-row class="panel-name">
        To Perform Control Data Set Operations, Specify:
      </a-row>

      <a-row>
        <a-col :offset="1">
          <a-input
            v-focus
            v-model="cdsName"
            class="panel-option"
            addonBefore="CDS Name"
            placeholder="(1 to 44 Character Data Set Name or 'Active')"
          ></a-input>
        </a-col>
      </a-row>
      <a-row>
        <a-input
          class="panel-option"
          addonBefore="Select one of the following Options: "
          @pressEnter="onEnter"
        ></a-input>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">1</a-col>
        <a-col :span="5" class="panel-name">Display</a-col>
        <a-col :span="17" class="panel-desc">
          - Display the Base Configuration
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">2</a-col>
        <a-col :span="5" class="panel-name">Define</a-col>
        <a-col :span="17" class="panel-desc">
          - Define the Base Configuration
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">3</a-col>
        <a-col :span="5" class="panel-name">Alter</a-col>
        <a-col :span="17" class="panel-desc">
          - Alter the Base Configuration
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">4</a-col>
        <a-col :span="5" class="panel-name">Validate</a-col>
        <a-col :span="17" class="panel-desc">- Validate the SCDS</a-col>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">5</a-col>
        <a-col :span="5" class="panel-name">Activate</a-col>
        <a-col :span="17" class="panel-desc">- Activate the CDS</a-col>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">6</a-col>
        <a-col :span="5" class="panel-name">Cache Display</a-col>
        <a-col :span="17" class="panel-desc">
          - Display CF Cache Structure Names for all CF Cache Sets
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">7</a-col>
        <a-col :span="5" class="panel-name">Cache Update</a-col>
        <a-col :span="17" class="panel-desc">
          - Define/Alter/Delete CF Cache Sets
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">8</a-col>
        <a-col :span="5" class="panel-name">Lock Display</a-col>
        <a-col :span="17" class="panel-desc">
          - Display CF Lock Structure Names for all CF Lock Sets
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="1" :span="1" class="panel-cmd">9</a-col>
        <a-col :span="5" class="panel-name">Lock Update</a-col>
        <a-col :span="17" class="panel-desc">
          - Define/Alter/Delete CF Lock Sets
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cdsName: ""
    };
  },
  methods: {
    onEnter(e) {
      if (e.target.value) {
        this.$store.commit(
          "ispf/SET_CDS_NAME",
          this.cdsName.trim().toUpperCase()
        );
        const panel = `is_8_${e.target.value.trim()}`
          .replace(/\./g, "_")
          .toLowerCase();
        this.$store.commit("ispf/SET_PANEL", panel);
      }
    }
  }
};
</script>

<style scoped></style>
