// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('users').find({name: 'Callum'}).toArray().then(docs => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, err => {
    if (err){
      console.log('There was an error', err);
    }
  });


  // db.collection('Todos').find({
  //   completed: false
  // }).count().then(count => {
  //   console.log(`Uncompleted tasks: ${count}`);
  // }, err => {
  //   console.log('Unable to fetch todos', err);
  // });

  // db.collection('Todos').find({
  //   completed: false
  // }).toArray().then(docs => {
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, err => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.close();
});
