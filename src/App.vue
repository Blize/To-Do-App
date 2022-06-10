<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Anton&family=Nova+Mono&family=Roboto+Mono:ital,wght@1,200&display=swap"
    rel="stylesheet"
  />

  <div
    :class="theme === 'light' ? 'light-theme' : 'dark-theme'"
    class="main-body"
  >
    <div class="ImgButtonMoonSun">
      <el-button
        v-if="this.theme == 'light'"
        :icon="Sunny"
        class="el-buttonIcon"
        @click="changeTheme"
      ></el-button>

      <el-button
        v-else
        :icon="Moon"
        class="el-buttonIcon"
        @click="changeTheme"
      ></el-button>
    </div>

    <router-view />
    <div class="nav"></div>
  </div>
</template>

<script>
import { Sunny } from '@element-plus/icons-vue';
import { Moon } from '@element-plus/icons-vue';

export default {
  name: 'App',
  components: {},
  data() {
    return {
      theme: 'light',
      Moon,
      Sunny,
    };
  },
  methods: {
    changeTheme() {
      console.log('Change the theme');
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      console.log(this.theme);
    },
  },
};
</script>

<style>
img {
  top: 10rem;
  max-width: 20rem;
  max-height: 20rem;
}

body::-ms-reveal {
  display: none;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}
#app.font-RobotMono {
  font-family: Roboto Mono;
}
#app.font-TimesNewRoman {
  font-family: 'Times New Roman', Times, serif;
}
#app.font-Anton {
  font-family: Anton;
}
#app.font-RobotoMono {
  font-family: Roboto Mono;
}
#app.font-NovaMono {
  font-family: Nova Mono;
}
.Signiu {
  margin: 1em;
}
#Vue-Logo {
  max-height: 50px;
  top: 5em;
}
.main-body {
  min-height: 100vh;
  padding: 0 2px 0 2px;
}
.light-theme {
  margin: 0;
  background-color: whitesmoke;
  color: black;
  border: black;
  transition-duration: 0.5s;
}
.light-theme header {
  background: #f0f0f0;
}
.dark-theme header {
  background: #333333;
}
.dark-theme {
  top: 0;
  background-color: #3d3d3d;
  color: rgb(167, 167, 167);
  border: rgb(0, 0, 0);
  transition-duration: 0.5s;
}
.el-buttonIcon {
  right: 3rem;
  bottom: 2.5rem;
  position: fixed;
}
#picture {
  height: 5rem;
  width: 5rem;
}
.SunMoon {
  height: 3rem;
  width: 3rem;
  border: black solid 5px;
  border-radius: 50px;
}
.ButtonDarkLight {
  border: #212529 3px solid;
  border-radius: 40px;
  background: #212529;
}
.light-theme .ButtonDarkLight {
  border: whitesmoke 3px solid;
  border-radius: 40px;
  background: whitesmoke;
}
</style>
