import { createApp } from 'vue';
import App from './App.vue';
import HomePage from './components/HomePage.vue';
import SignUp from './login/SignUp.vue';
import signIn from './login/signIn';
import { createRouter, createWebHashHistory } from 'vue-router';
import Setting from './components/Setting.vue';
import Info from './components/Info.vue';
import QAPage from './components/QAPage.vue';
import ForgotEmail from './login/ForgotEmail.vue';
import ForgotPassword from './login/ForgotPassword.vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@element-plus/icons-vue';

const app = createApp(App);

// const ToDoHomePage = { template: '<div>ToDoHomePage</div>' }
// const Abmelden = { template: '<div>Abmelden<//div>' }

const routes = [
  { path: '/home', component: HomePage, name: 'home' },
  { path: '/', component: SignUp, name: 'signUp' },
  { path: '/signIn', component: signIn, name: 'signIn' },
  { path: '/home/Settings', component: Setting, name: 'settings' },
  { path: '/home/Info', component: Info },
  { path: '/home/Q%A', component: QAPage },
  {
    path: '/signIn/EmailVerification',
    component: ForgotEmail,
    name: 'forgotEmail',
  },
  {
    path: '/signIn/NewPassword',
    component: ForgotPassword,
    name: 'forgotPassword',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const PublicRoutes = ['signIn', 'signUp', 'forgotPassword', 'forgotEmail'];

router.beforeEach((to, from, next) => {
  let isAuthenticated = sessionStorage.getItem('BooleanSafeURL');
  if (!PublicRoutes.includes(to.name) && isAuthenticated === 'false') {
    next({ name: 'signUp' });
  } else if (!PublicRoutes.includes(to.name) && isAuthenticated === null) {
    next({ name: 'signUp' });
  } else {
    next();
  }
});

app.use(router);
app.use(ElementPlus);
app.mount('#app');
