//Schema for user objects


const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const crypto = require('crypto');

require('dotenv').config();

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: 
  {
    type: String,
  },
  password:
  {
    type: String,
  },
  isAdmin: 
  {
    type: Boolean,
    default: true
  }
},{
  timestamps: true
});


//using Cypto library here
userSchema.methods.setPassword = function(password) {
  this.password = crypto.pbkdf2Sync(password, process.env.SALT, 1000, 64, `sha512`).toString(`hex`);
 }
  
 userSchema.methods.validPassword = function(password) {
  const _password = crypto.pbkdf2Sync(password, process.env.SALT, 1000, 64, `sha512`).toString(`hex`);
  return this.password === _password;
 }
 

const User = mongoose.model("User", userSchema);

module.exports = User;