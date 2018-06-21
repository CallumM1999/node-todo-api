var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {user} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);

  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => res.send(doc),
    err => res.status(400).send(err)
  );
});

app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    res.send({todos});
  }, e => {
    res.status(400).send(e);
  });
});

// GET /todos/1234324
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) return res.status(404).send();
  user.findById(id).then(response => {
    if (!response) return res.status(404).send();
    res.send({response});
  }).catch(e => res.status(400).send());
});

app.listen(3000, () => console.log('Started on port 3000'));

module.exports = {app};
