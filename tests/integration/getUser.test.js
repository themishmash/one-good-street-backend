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


//get users
test("Test the /users endpoint, return all users", async () => {
  const { token } = JSON.parse(await login())
  console.log(token)
  await request(app)
    .get('/users')
    .set('authorization', token)
    .expect(200)
})