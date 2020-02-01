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


//Create an item
test('Test the /items/create endpoint, correct itemName, headline, description, category, postcode, firstName, lastName, phone, address, email, privacy, delivery', async () => {
  await request(app)
    .post('/items/create')

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
    .expect(200);
});

//get items
test('Test the /items endpoint, return all items', async () => {
  await request(app)
    .get('/items')
    .expect(200);
});

//get items by id
test('Test the /items/:id endpoint, return item by id', async () => {
  await request(app)
    .get('/items/5e3394016f002c68c7400431')
    .expect(200); 

});


//edit items by id
test('Edit the /items/edit/:id endpoint, edit item by id', async () => {
  const {token} = JSON.parse(await login());
  console.log(token);
  await request(app)
    .put('/items/edit/5e3394671b8b6268f1bd935e')
    .set('authorization', token)
    .expect(200); 
});



})