// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate(
  //   {text: 'Eat lunch'},
  //   {$set: {completed: true}},
  //   {returnOriginal: false}
  // ).then(result => console.log(result));

 // Update name andincrement age by 1
 db.collection('users').findOneAndUpdate(
   {_id: new ObjectId("5b29108c2f7595370db4618b")},
   {
     $set: {name: 'Callum'},
     $inc: {age: 1}
   },
   {returnOriginal: false}
 ).then(result => console.log(result));


  db.close();
});
