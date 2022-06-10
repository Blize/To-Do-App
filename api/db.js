const { Sequelize, DataTypes } = require('sequelize');
const { getDatabaseConfig } = require('./config');
const bcrypt = require('bcrypt');
const session = require('express-session');

const dbConfig = getDatabaseConfig();
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'mariadb',
  }
);
const User = sequelize.define(
  'users',
  /*userschema,*/ {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    FirstName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }
);
const Todo = sequelize.define('todos', {
  title: DataTypes.STRING,
  checked: DataTypes.BOOLEAN,
});
const FeedBack = sequelize.define('feedBacks', {
  text: DataTypes.STRING,
  up: DataTypes.INTEGER,
  down: DataTypes.INTEGER,
});

FeedBack.belongsTo(User);
User.hasMany(FeedBack);

User.hasMany(Todo);
Todo.belongsTo(User);

sequelize
  .sync()
  .then(() => {
    console.log('Successfully synched database models');
  })
  .catch((err) => {
    console.log(err);
  });
function getTodos(userId) {
  return Todo.findAll({
    where: {
      userId: userId,
    },
  });
}
function GetAllFeedBack() {
  return FeedBack.findAll();
}
function addFeedBack(feedBack) {
  return FeedBack.create(feedBack);
}
function addTodo(todo) {
  return Todo.create(todo);
}
function getOneTodo(taskId) {
  return Todo.findByPk(taskId);
}
function getOneFeedBack(Id) {
  return FeedBack.findByPk(Id);
}
function addUser(user) {
  return User.create(user);
}

async function UserPasswordUpdating(NewPassword, currentUserId) {
  console.log(NewPassword, currentUserId);
  return User.update(
    { password: NewPassword.password },
    {
      where: {
        id: currentUserId,
      },
    }
  );
}
async function LoginVerify(loginUser) {
  const TestLoginInput = await User.findOne({
    where: {
      username: loginUser.username,
    },
    attributes: ['id', 'password'],
  });

  const isMatch = await bcrypt.compare(
    loginUser.password,
    TestLoginInput.password
  );

  if (isMatch) {
    return TestLoginInput;
  } else return false;
}
async function EmailVerify(EmailFromUser) {
  const TestEmailInput = await User.findOne({
    where: {
      email: EmailFromUser.email,
    },
    attributes: ['email', 'id'],
  });
  if (TestEmailInput != null) {
    return TestEmailInput;
  } else return false;
}

async function getOneUserName(userId) {
  const UserName = await User.findOne({
    where: {
      id: userId,
    },
    attributes: ['name'],
  });
  return UserName;
}

module.exports = {
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
};
