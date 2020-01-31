const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

//get users
// test("Test the /items endpoint, return all items", async () => {
  
//   await request(app)
//     .get('/items')
//     .set('Accept', 'application/json')
//     .expect('Content-Type', /json/)
//     .expect(200)
//     .then(response => {
//       assert(response.body.itemName)
//     })
// })