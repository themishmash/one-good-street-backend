const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const {login} = require('../utils/login');
require('../../models/user-model')
require('dotenv').config();

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
})

describe('testing user endpoints', () => {
  //get all users
  test('Test the /users endpoint, return all users', async () => {
    const {token} = JSON.parse(await login());
    const response = await request(app)
      .get('/users')
      .set('authorization', token)
      .expect(200);
  });

  //get users by ID
  test('Test the /users/:id endpoint, return all users', async () => {
    const {token} = JSON.parse(await login());
    console.log(token);
    await request(app)
      .get('/users/5e339c529c9e656fdd253057')
      .set('authorization', token)
      .expect(200);
  });
});
