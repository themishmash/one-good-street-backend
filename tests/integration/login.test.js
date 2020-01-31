const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const { login } = require('../utils/login')
require('dotenv').config();

//beforeEach is jest 
beforeEach(() => {
  mongoose.connect('mongodb://localhost:27017/supertest',  {useNewUrlParser: true}, (err) => {
    if (err) {
      console.log('not connected')
    } else {
      console.log('connected')
    }
  })
})

//testing users first - create a user with a new email. If errors - change to new email number. eg mich6@gmail.com
test("Test the /users/create endpoint, correct username and password", async () => {
  const { token } = JSON.parse(await login())
  console.log(token)
  await request(app)
    .post('/users/create')
    .set('authorization', token)
    .send({
      email: 'mich5@gmail.com',
      password: 'password'
    })
    .expect(200)
})
