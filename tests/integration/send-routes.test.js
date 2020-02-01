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
test('Test the /send/involved route works', async () => {
  await request(app)
    .post('/send/involved')
    .send({
      firstName: 'm',
      lastName: 'w',
      email: 'mich@gmail.com',
      services: 'Volunteer'
    })
    .expect(200);
});

test('Test the /send/contact route works by sending a message and returning 200 message', async () => {
  await request(app)
    .post('/send/contact')
    .send({
      name: 'm',
      email: 'mich@gmail.com',
      message: 'hi'
    })
    .expect(200);
});


})