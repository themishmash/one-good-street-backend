const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

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

//Create an item with. 
test("Test the /items/create endpoint, correct itemName, headline, description, category, postcode, firstName, lastName, phone, address, email, privacy, delivery", async () => {
 
  await request(app)
    .post('/users/create')
 
    .send({
      itemName: 'Wheelchair',
      headline: 'Test',
      description: 'Test',
      category: 'Mobility',
      postcode: '3000',
      firstName: 'Molly',
      lastName: 'Molly',
      phone: 123456,
      address: '123 Spencer Street',
      email: 'com@com.com',
      privacy: 'Publish my email and first name',
      delivery: true
    })
    .expect(200)
})