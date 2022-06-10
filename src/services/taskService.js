//import { ConstantTypes } from "@vue/compiler-core";
import axios from 'axios';

export function UpdateTask(TaskValue) {
  return axios
    .put(`/api/tasks/${TaskValue.id}`, TaskValue)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export const GetFeedBack = () => {
  return axios
    .get('/api/feedBack/')
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const GetTask = () =>
  axios
    .get('/api/tasks')
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });

export const GetOneUserNameToDisplay = () =>
  axios
    .get('/api/oneUserName')
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.error(e);
    });

export function DeleteCheckedTask(ItemsToDelete) {
  ItemsToDelete.forEach((task) => {
    axios.delete(`/api/tasks/${task.id}`).then((res) => {
      return res;
    });
    location.reload(true);
  });
}
export function CreateFeedBack(feedBack) {
  return axios.post('/api/feedBack/', { ...feedBack }).then((res) => {
    console.log(res);
    return res.data;
  });
}

export function CreateTask(task) {
  return axios.post('/api/tasks', { ...task }).then(function (res) {
    console.log(res);
  });
}

export function CreateUser(user) {
  return axios.post('/api/user', { ...user }).then(function (res) {
    console.log(res.data);
    return res.data;
  });
}

export function GetUserData() {
  return axios.get('/api/user').then((res) => {
    return res.data;
  });
}

export function OneUserToUpdate(UserToUpdatePassword) {
  const UserId = sessionStorage.getItem('userId');
  return axios
    .put('/api/userpassword', {
      ...UserToUpdatePassword,
      UserId,
    })
    .then((res) => {
      console.log(res);
      return res.data;
    });
}
export function FeedBackToUpdate(LikeOrDislikeValue, FeedBackId) {
  return axios
    .put(`/api/feedBack/${FeedBackId}`, {
      ...LikeOrDislikeValue,
    })
    .then((res) => {
      return res.data;
    });
}

export function LoginUserCompare(LoginUser) {
  return axios.post('/api/loginUser', { ...LoginUser }).then((res) => {
    return res.data;
  });
}

export function EmailUserCompare(EmailUser) {
  console.log(EmailUser);
  return axios.post('/api/emailUser', { ...EmailUser }).then((res) => {
    return res.data;
  });
}
