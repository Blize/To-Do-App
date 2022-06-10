<template>
  <div id="Home">
    <el-button type="primary" @click="BackHome">Sign Up</el-button>
  </div>

  <div class="Place">
    <br />
  </div>

  <h1 class="SignInHeader">Sign In</h1>
  <div class="HeadofSignIn">
    <div class="username">
      <label for="usermame2">Username: </label>
      <el-input
        type="text"
        id="username2"
        placeholder="Enter your username here"
        v-model="userSignIn.username2"
      />
    </div>

    <div>
      <label for="Password2">Password: </label>
      <div class="password">
        <el-input
          type="password"
          id="Password2"
          placeholder="Enter your Password here"
          v-model="userSignIn.password2"
        />
      </div>

      <div class="buttonToSignIn">
        <el-button type="info" size="mini" plain @click="SignIn()"
          >Sign In</el-button
        >
      </div>
      <div class="ForgotPassword">
        <el-button type="info" size="mini" plain @click="ForgotPassword()"
          >Forgot Password</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { LoginUserCompare } from '../services/taskService';

export default {
  name: 'signIn',
  data() {
    return {
      userSignIn: {
        username2: '',
        password2: '',
      },
    };
  },
  methods: {
    SignIn() {
      LoginUserCompare(this.userSignIn).then((res) => {
        if (res) {
          sessionStorage.setItem('userId', res.id);
          sessionStorage.setItem('BooleanSafeURL', true);
          // weiterleiten Home
          this.$router.push('/home');
        } else {
          sessionStorage.removeItem('userId');
          alert(
            "Your login data isn't available at our system, if you haven't created a user go to Sign Up or if you forgot you password, you can easily change it"
          );
        }
      });
    },
    BackHome() {
      this.$router.push('/');
    },
    ForgotPassword() {
      this.$router.push('/signIn/EmailVerification');
    },
  },
};
</script>

<style scoped>
.username {
  margin: 0.5rem;
}
.password {
  margin: 0.5rem;
}
#username2 {
  margin: 1em;
}
#Password2 {
  margin: 1em;
}
.HeadofSignIn {
  text-align: center;
  margin: auto;
  width: fit-content;
  border: solid 0.01em;
  border-radius: 10px;
  padding-bottom: 1rem;
}
.buttonToSignIn {
  margin: 0.3em;
  transition: 0.5s;
}
.buttonToSignIn:hover {
  transform: scale(0.95);
}
#Home {
  position: absolute;
  top: 1.5rem;
  left: 3rem;
}
.Place {
  padding: 4rem;
}
</style>
