<template>
  <el-button type="primary" id="BackHome" @click="BackHome"
    >Back Home</el-button
  >

  <h1>Please verify your email</h1>

  <div id="BorderEmail">
    <div class="email">
      <label for="Email">Email: </label>
      <el-input type="email" for="Email" v-model="EmailVerify.Email" />
    </div>

    <div class="PlaceForButton">
      <el-button type="warning" plain size="mini" @click="NewPassword()"
        >New Password</el-button
      >
    </div>
  </div>
</template>

<script>
import { EmailUserCompare } from '../services/taskService';

export default {
  data() {
    return {
      EmailVerify: {
        Email: '',
      },
    };
  },
  methods: {
    NewPassword() {
      EmailUserCompare(this.EmailVerify).then((res) => {
        if (res) {
          console.log(res);
          sessionStorage.setItem('userId', res.id);
          this.$router.push('/signIn/NewPassword');
        } else {
          alert('We did not find your emil in the system');
        }
      });
    },
    BackHome() {
      this.$router.push('/');
      sessionStorage.removeItem('BooleanSafeURL');
    },
  },
};
</script>

<style>
.email {
  margin: 0.5rem;
}
#BorderEmail {
  border: solid 2px;
  width: fit-content;
  margin: auto;
  padding: 2rem;
  border-radius: 25px;
}
.PlaceForButton {
  padding-top: 6px;
}
h1 {
  padding-top: 3rem;
}
#BackHome {
  margin-top: 1.5rem;
}
</style>
