// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj)

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  //
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('unable to insert todo', err)
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Insert new doc into Users (name, age, location)

  db.collection('users').insertOne({
    name: 'Callum',
    age: 18,
    location: 'Colchester'
  }, (err, result) => {
    if (err) {
      return console.log('Error connecting to database', err);
    }

    console.log('Success connecting to database');
    console.log(JSON.stringify(result.ops, undefined, 2));

  });

  db.close();
});
