const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  text: 'First test todo',
  _id: new ObjectID()
}, {
  text: 'second test todo',
  _id: new ObjectID()
}];

beforeEach(done => {
  Todo.remove({}).then(() => Todo.insertMany(todos)).then(() => done());
});

describe('POST /todos', () => {

  it('should create a new todo', done => {
    const text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect(res => expect(res.body.text).toBe(text))
      .end((err, res) => {
        if (err) return done(err);

        Todo.find({text}).then(todos => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(e => done(e));
    });
  });

  it('should not create todo with invalid body data', done => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res) => {
        if (err) return done(err);
        Todo.find().then(
          todos => {
            expect(todos.length).toBe(2);
            done();
          }
        ).catch(e => done(e));
      });
  });

});

describe('GET /todos', () => {
  it('should get al todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => expect(res.body.todos.length).toBe(2))
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => expect(res.body.todo.text).toBe(todos[0].text))
      .end(done);
  });

  it('should return a 404 if todo not found', done => {
    const randomID = new ObjectID();
    request(app)
      .get(`/todos/${randomID}`)
      .expect(404)
      .expect(res => expect(res.body.todo).toBe(undefined))
      .end(done);
  });

  it('should return 404 for non-object ids', done => {
    const ID = `${todos[0]._id.toHexString()}76`;
    request(app)
      .get(`/todos/${ID}`)
      .expect(404)
      .expect(res => expect(res.body.todo).toBe(undefined))
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', done => {
    const hexID = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect(res => expect(res.body.todo._id).toBe(hexID))
      .end((err, res) => {
        if (err) return done(err);

        Todo.findById(hexID).then(
          todos => {
            expect(todos).toNotExist();
            done();
          }).catch(e => done(e));
      });
  });

  it('should return 404 if todo not found', done => {
    const randomID = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${randomID}`)
      .expect(404)
      .end(done);

  });

  it('should return 404 if object id is not valid', done => {
    const ID = `${todos[0]._id.toHexString()}76`;
    request(app)
      .delete(`/todos/${ID}`)
      .expect(404)
      .expect(res => expect(res.body.todo).toBe(undefined))
      .end(done);
  });

});
