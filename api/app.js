const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');

const {
  getTodos,
  addTodo,
  getOneTodo,
  addUser,
  LoginVerify,
  UserPasswordUpdating,
  EmailVerify,
  addFeedBack,
  GetAllFeedBack,
  getOneFeedBack,
  getOneUserName,
} = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(
  session({
    secret: 'Key to sign cookie',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.sendStatus(403);
  }
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/oneUserName', async (req, res) => {
  const userId = req.session.user.id;
  const UserName = await getOneUserName(userId);
  res.json(UserName);
});

app.get('/api/tasks', isAuth, async (req, res) => {
  console.log(req.header('userId'));
  console.log('User from session:', req.session.user);
  const userId = req.session.user.id;
  const todos = await getTodos(userId);
  res.json(todos);
});

app.get('/api/feedBack/', isAuth, async (req, res) => {
  const AllFeedBacks = await GetAllFeedBack();
  res.json(AllFeedBacks);
});
//read
app.get('/api/tasks/:taskId', async (req, res) => {
  const Id = req.params.taskId;
  const OneTodo = await getOneTodo(Id);
  if (OneTodo == null) {
    res.status(404).send('Not found');
  } else {
    res.json(OneTodo);
  }
});

app.post('/api/loginUser', async (req, res) => {
  const loginUser = {
    username: req.body.username2,
    password: req.body.password2,
  };
  const RightUserLogin = await LoginVerify(loginUser);
  console.log(req.session);
  req.session.isAuth = true;
  req.session.user = RightUserLogin;
  res.json(RightUserLogin);
});

app.post('/api/emailUser', async (req, res) => {
  const EmailFromUser = {
    email: req.body.Email,
  };
  const RightUserEmail = await EmailVerify(EmailFromUser);
  res.json(RightUserEmail);
});

//create
app.post('/api/tasks', async (req, res) => {
  console.log(req.body);

  if (req.body && req.body.title != undefined) {
    const userId = req.session.user.id;
    const todo = {
      title: req.body.title,
      checked: false,
      userId: userId,
    };

    try {
      const result = await addTodo(todo);
      console.log(result);
    } catch (e) {
      console.error(e);
    }
    res.sendStatus(201); // Created
  } else {
    res.sendStatus(500); // Int. server error
  }
});

app.put('/api/feedBack/:feedBackId', async (req, res) => {
  const Id = req.params.feedBackId;
  console.log(Id);
  let FeedbackToUpdate = await getOneFeedBack(Id);
  FeedbackToUpdate.set(req.body);
  console.log(FeedbackToUpdate);
  const updatedFeedBack = await FeedbackToUpdate.save();
  res.json(updatedFeedBack);
});

//update
app.put('/api/tasks/:taskId', async (req, res) => {
  const Id = req.params.taskId;
  let TodoToUpdate = await getOneTodo(Id);
  TodoToUpdate.set(req.body);
  const updatedTodo = await TodoToUpdate.save();
  res.json(updatedTodo);
});

//update
app.put('/api/userpassword', async (req, res) => {
  //const UserId = req.params.userId;

  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const NewPassword = {
    password: hashedPassword,
    password2: req.body.password2,
  };
  const currentUserId = req.body.UserId;
  const UserId = parseInt(currentUserId);
  const UserPasswordUpdate = UserPasswordUpdating(NewPassword, UserId);
  res.json(UserPasswordUpdate);
});

//delete
app.delete('/api/tasks/:taskId', async (req, res) => {
  const Id = req.params.taskId;
  const DeletingItem = await getOneTodo(Id);
  await DeletingItem.destroy();
  res.json(DeletingItem);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/api/tasks', async (req, res) => {
  console.log(req.body);

  if (req.body && req.body.title != undefined) {
    const todo = {
      title: req.body.title,
      checked: false,
    };

    try {
      const result = await addTodo(todo);
      console.log(result);
    } catch (e) {
      console.error(e);
    }
    res.sendStatus(201); // Created
  } else {
    res.sendStatus(500); // Int. server error
  }
});

app.post('/api/feedBack', async (req, res) => {
  console.log(req.body);

  if (req.body) {
    const FeedBack = {
      text: req.body.text,
      up: req.body.up,
      down: req.body.down,
    };

    const result = await addFeedBack(FeedBack);
    console.log(result);

    res.status(201).json(result);
    //FeedBack is now created
  } else {
    res.sendStatus(500);
  }
});

app.post('/api/user', async (req, res) => {
  console.log(req.body);

  const hashedpw = await bcrypt.hash(req.body.password, 12);

  if (req.body) {
    const User = {
      username: req.body.username,
      name: req.body.name,
      FirstName: req.body.FirstName,
      email: req.body.email,
      password: hashedpw,
    };

    const result = await addUser(User);
    console.log(result);
    req.session.isAuth = true;
    res.status(201).json(result);
    // Created
  } else {
    res.sendStatus(500);
  }
});
