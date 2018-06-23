const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {user} = require('./../../models/user');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const users = [{
  _id: userOneID,
  email: 'user1@gmail.com',
  password: 'userOnePassword',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneID, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoID,
  email: 'user2@gmail.com',
  password: 'userTwoPassword',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoID, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const todos = [{
  text: 'First test todo',
  _id: new ObjectID(),
  _creator: userOneID
}, {
  text: 'second test todo',
  _id: new ObjectID(),
  _creator: userTwoID,
  completed: true,
  completedAt: 333
}];

const populateTodos = done => {
  Todo.remove({}).then(() => Todo.insertMany(todos)).then(() => done());
};

const populateUsers = done => {
  user.remove({}).then(() => {
    var userOne = new user(users[0]).save();
    var userTwo = new user(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done())
};

module.exports = {todos, populateTodos, users, populateUsers};
