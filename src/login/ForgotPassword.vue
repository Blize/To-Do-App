<template>
  <el-button type="primary" class="BackHome" @click="BackHome()"
    >Back Home</el-button
  >

  <h1>Change your Password</h1>

  <div id="NewPassword">
    <div class="FirstPassword">
      <label for="newpassword">New Password: </label>
      <el-input
        type="password"
        for="newpassword"
        v-model="NewPasswords.password"
      />
      <div class="Error">
        {{ passwordError }}
      </div>
    </div>

    <div class="SecondPassword">
      <label for="repassword">Verify Password: </label>
      <el-input
        type="password"
        for="repassword"
        v-model="NewPasswords.password2"
      />
      <div class="Error">
        {{ password2Error }}
      </div>
    </div>
    <el-button
      type="danger"
      size="mini"
      plain
      class="SetNew"
      @click="SetNewPassword"
      >Finish</el-button
    >
  </div>
</template>

<script>
import { OneUserToUpdate } from '../services/taskService';

export default {
  data() {
    return {
      NewPasswords: {
        password: '',
        password2: '',
      },
      NewPasswordsError: {
        passwordError: '',
        password2Error: '',
      },
    };
  },
  methods: {
    SetNewPassword() {
      const PasswordMatch =
        this.NewPasswords.password === this.NewPasswords.password2;

      if (PasswordMatch) {
        OneUserToUpdate(this.NewPasswords).then(() => {
          alert('We successfully changed your password!');
          this.$router.push('/signIn');
          sessionStorage.removeItem('BooleanSafeURL');
        });
      } else {
        alert('Your first and second password do not match');
      }
    },
    BackHome() {
      this.$router.push('/');
      sessionStorage.removeItem('BooleanSafeURL');
    },
  },
};
</script>

<style>
#NewPassword {
  border: solid 3px;
  width: fit-content;
  padding: 1rem;
  border-radius: 30px;
  margin: auto;
  width: 15rem;
}
.FirstPasswird {
  margin: 0.5rem;
}
.SecondPassword {
  margin: 0.5rem;
}
.BackHome {
  align-self: center;
  top: 1.5rem;
  position: sticky;
}
h1 {
  margin: 0;
  top: 5rem;
  padding: 2rem;
}
</style>
