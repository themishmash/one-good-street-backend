//Create, get and update (no delete)

const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const {login} = require('../utils/login');

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
})

//request password reset
test('Test the request for resetting password route, make sure it works', async () => {
  await request(app)
    .post('/password/request')
    .send({
      email: 'mich@gmail.com'
    })
    .expect(200);
});




})