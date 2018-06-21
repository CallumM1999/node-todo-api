const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {user} = require('./../server/models/user');

var id = '5b2b8d4d8c3865d24f72874c';
var userID = '5b2b96ff3c56c84d3f92b89e';

// if (!ObjectID.isValid(id)) console.log('ID not valid: ', id);


// Todo.find({_id: id}).then(todos => console.log('Todos', todos));
//
// Todo.findOne({_id: id}).then(todo => console.log('Todo', todo));


// Todo.findById(id).then(todo => {
//
//   if (!todo) return console.log('ID not found');
//
//   console.log('Todo By ID', todo);
// }).catch(e => console.log(e));


// query works but no users
// user is found
// handle any other errors


user.findById(userID).then(user => {
  if (!user) return console.log('User not found');
  console.log('Found user: ', JSON.stringify(user, undefined, 2));
}), e => console.log(e);
