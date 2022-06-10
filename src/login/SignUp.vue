<template>
  <div class="Place">
    <br />
  </div>
  <h1 id="LoginHeader">Welcome to Checked</h1>
  <h2 id="SignUpTitle">Sign Up</h2>

  <div id="head">
    <div class="username">
      <label for="username">Username</label>
      <el-input
        type="text"
        id="username"
        placeholder="username..."
        v-model="user.username"
      />
      <div class="error">
        {{ userErrors.usernameError }}
      </div>
    </div>

    <div class="name">
      <label for="name">Name</label>
      <el-input
        type="text"
        id="name"
        placeholder="Name..."
        v-model="user.name"
      />
      <div class="error">
        {{ userErrors.nameError }}
      </div>
    </div>

    <div class="FirstName">
      <label for="FirstName">First Name</label>
      <el-input
        type="text"
        id="FirstName"
        minlength="6"
        placeholder="First Name..."
        v-model="user.FirstName"
      />
      <div class="error">
        {{ userErrors.firstNameError }}
      </div>
    </div>

    <div class="email">
      <label for="email">Email</label>
      <el-input
        type="text"
        id="email"
        name="email"
        placeholder="example@gmail.com"
        v-model="user.email"
      />
      <div class="error">
        {{ userErrors.emailError }}
      </div>
    </div>
    <div class="password">
      <label id="password">Password</label>
      <el-input
        type="password"
        id="password"
        v-model="user.password"
        placeholder="password"
        show-password
      />
      <div class="error">
        {{ userErrors.passwordError }}
      </div>
    </div>
    <div class="SignUp">
      <el-button
        type="primary"
        plain
        size="mini"
        class="Signiu"
        @click="SignUpLocal"
        >Sign Up</el-button
      >
      <el-button
        type="primary"
        plain
        size="mini"
        class="buttonRegist"
        @click="signIn"
        >Sign In</el-button
      >
    </div>
  </div>
</template>

<script>
//import HelloWorld from '../components/HelloWorld'

import { CreateUser } from '../services/taskService';

export default {
  name: 'SignUp',
  props: {},
  data() {
    return {
      user: {
        username: '',
        name: '',
        FirstName: '',
        email: '',
        password: '',
      },
      userErrors: {
        usernameError: '',
        nameError: '',
        firstNameError: '',
        emailError: '',
        passwordError: '',
      },
    };
  },
  methods: {
    SignUpLocal() {
      this.Validate();
      const UserErrorArray = Object.values(this.userErrors);
      const isValid = UserErrorArray.every((Error) => {
        return Error === '';
      });
      if (isValid) {
        CreateUser(this.user).then((res) => {
          sessionStorage.setItem('BooleanSafeURL', true);
          sessionStorage.setItem('userId', res.id);
          this.$router.push('/home');
        });
      }
    },
    signIn() {
      this.$router.push('/signIn');
    },
    Validate() {
      // Set Error Messages in Data-Prop userErrors
      if (this.user.username.length < 3) {
        this.userErrors.usernameError = 'Min length is 3';
      } else this.userErrors.usernameError = '';

      if (this.user.name.length < 3) {
        this.userErrors.nameError = 'Min length is 3';
      } else this.userErrors.nameError = '';
      if (this.user.FirstName.length < 2) {
        this.userErrors.firstNameError = 'Min length is 2';
      } else this.userErrors.firstNameError = '';
      let pattern = /\S+@\S+\.\S+/;
      if (!pattern.test(this.user.email)) {
        //Regexp Regular Expresion Email Validation
        this.userErrors.emailError = "You're email isn't valid";
      } else this.userErrors.emailError = '';
      if (this.user.password.length < 5) {
        this.userErrors.passwordError = 'Min length is 5';
      } else this.userErrors.passwordError = '';
    },
  },
};
</script>

<style scoped lang="scss">
#LoginHeader {
  border-bottom: solid 0.1em;
  width: fit-content;
  text-align: center;
  margin: auto;
  padding: 1rem;
  //border-radius: 30px;
}

.username {
  margin: 0.5em;
  text-align: center;
}

.name {
  margin: 1em;
  text-align: center;
}

.FirstName {
  margin: 1em;
}

.password {
  margin: 1em;
}
.email {
  margin: 1em;
}
label {
  display: block;
}

#head {
  //display: block;
  border: solid 0.25em;
  width: fit-content;
  text-align: center;
  margin: 1em auto auto;
  border-radius: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.48), 0 0 24px rgba(0, 0, 0, 0.16);
}
#head:hover {
  transition: 5s;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 0, 0, 0.25);
}
.buttonRegist {
  transition: 0.5s;
  margin-bottom: 1rem;
}
.buttonRegist:hover {
  transform: scale(0.95);
}
.Signiu {
  transition-duration: 0.5s;
}
.Signiu:hover {
  transform: scale(0.95);
}

.error {
  color: red;
  margin-top: 0.1rem;
}
.el-input.error {
  border: red 0.15rem;
}
.Place {
  padding: 4rem;
}
</style>
