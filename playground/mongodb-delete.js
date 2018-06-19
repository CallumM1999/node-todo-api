// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // DeleteMany
  // db.collection('Todos').deleteMany({
  //   text: 'Eat lunch'
  // }).then(result => console.log(result));

  // DeleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then(result => console.log(result));

  // FindOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then(result => console.log(result));

  // delete many
  // db.collection('users').deleteMany({name: 'Callum', location: 'Colchester'}).then(result => console.log(result));

  // delete one by id
  db.collection('users').findOneAndDelete({
    _id: new ObjectId("5b290f24a372cb1f72530b33")
  }).then(result => console.log(result));


  // db.collection('users').find({name: 'Callum'}).toArray().then(docs => {
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, err => {
  //   if (err){
  //     console.log('There was an error', err);
  //   }
  // });

  db.close();
});
