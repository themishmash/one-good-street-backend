const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

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

//get items
test('Test the /items endpoint, return all items', async () => {
  await request(app);

  await request(app)
    .get('/items')

    .expect(200);
});

//get items by id
test('Test the /items/:id endpoint, return item by id', async () => {
  await request(app);

  await request(app)
    .get('/items/5e3393d16a349668aedaab52')

    .expect(200); //expected error
});

  
})

