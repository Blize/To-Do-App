<template>
  <el-button type="primary" class="BackToHome" @click="HomeButton"
    >Back Home</el-button
  >

  <h1>Welcome to the info page</h1>
  <p>
    Hey this page was made by Matthias<br />
    as a first little Project. The mission of<br />
    this page was that Matthias is<br />
    learning Vue.Js. I hope you like it.<br />
    Sincerly Matthias ❤
  </p>

  <h3>
    <el-link alt="Protfolio" href="https://youtu.be/dQw4w9WgXcQ" type="primary"
      >Further Information</el-link
    >
  </h3>
</template>

<script>
export default {
  methods: {
    HomeButton() {
      this.$router.push('/home');
    },
  },
};
</script>

<style scoped>
.BackToHome {
  margin-top: 1.5rem;
}
h1 {
  padding-top: 5rem;
  border-bottom: 1px solid;
  width: fit-content;
  margin: auto;
}
</style>
