const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require('dotenv').config();

const requestSchema = new Schema({
  
  email: 
  {
    type: String
  },
  uniquekey:
  {
    type: String
  },
  expirydate: 
  {
    type: Date
  }
},{
  timestamps: true
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;