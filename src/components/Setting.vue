<template>
  <el-button type="primary" class="HomeButton" @click="BackHome"
    >Back Home</el-button
  >
  <h1>Settings Page</h1>
  <div id="SettingsBorder">
    <div id="TextPlace">
      <div id="output-text">Change your Font!</div>

      <el-select id="input-font" v-model="DropDownOptions" @change="changeFont">
        <el-option value="Arial" selected="selected">Arial</el-option>
        <el-option value="TimesNewRoman">Times New Roman</el-option>
        <el-option value="RobotMono">Roboto Mono</el-option>
        <el-option value="Anton">Anton</el-option>
        <el-option value="NovaMono">Nova Mono</el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    BackHome() {
      this.$router.push('/home');
    },
    changeFont() {
      console.log(this.DropDownOptions);
      document.getElementById('app').classList = 'font-' + this.DropDownOptions;
    },
  },
};
</script>

<style scoped>
.Arial {
  font-family: Arial, Helvetica, sans-serif;
}
.RobotMono {
  font-family: Robot Mono;
}
#SettingsBorder {
  background-color: #ffff;
  border: solid 0.1rem rgb(214, 214, 214);
  border-radius: 10px;
  width: fit-content;
  margin: auto;
}

#TextPlace {
  padding: 5rem;
}
.TextChose {
  padding-top: 00.5rem;
}
.HomeButton {
  margin-top: 1.5rem;
}
h1 {
  padding-top: 5rem;
}
#output-text {
  padding-bottom: 0.2rem;
}
</style>
