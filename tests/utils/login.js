const request = require('supertest')
const app = require('../../app')
require('dotenv').config();

exports.login = async () => {
  const response = await request(app)
   .post('/users/login')
   .send({
     email: 'mich@gmail.com',
     password: 'password'
   })
   return response.text
 }