const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const {login} = require('../utils/login');
const uuid = require('uuid/v4')
require('dotenv').config();


describe('Testing mongoose', () => {
//beforeEach is jest
beforeAll(() => {
  mongoose.connect(
    'mongodb://localhost:27017/supertest',
    {useNewUrlParser: true},
    (err) => {
      if (err) {
        console.log('not connected');
      } else {
        console.log('connected');
      }
    }
  );
});


afterAll(() => {
  mongoose.disconnect()

  console.log(disconnect)
})

//testing users first - create a user with a new email. 
test('Test the /users/create endpoint, correct username and password', async () => {
  const { token } = JSON.parse(await login())
  const id = uuid();
  const email = `email${id}@gmail.com`
  const response = await request(app)
    .post('/users/create')
    .set('authorization', token)
    .send({
      email: email,
      password: 'password'
    })
    .expect(200)
});

//get users
test('Test the /users endpoint, return all the users', async () => {
  const {token} = JSON.parse(await login());
  console.log(token);
  await request(app)
    .get('/users')
    .set('authorization', token)
    .expect(200); 
});

//get users by id
test('Test the /users/:id endpoint, return user by id', async () => {
  const {token} = JSON.parse(await login());
  console.log(token);
  await request(app)
    .get('/users/5e33a0f8c451cd7288aedfec')
    .set('authorization', token)
    .expect(200); 
});



//Delete user by id
test('Test the /users/delete/:id endpoint, edit user by id', async () => {
  const {token} = JSON.parse(await login());
  console.log(token);
  await request(app)
    .delete('/users/delete/5e33a1c3ee02f5731d1fbd35')
    .set('authorization', token)
    .expect(200); 
});



})