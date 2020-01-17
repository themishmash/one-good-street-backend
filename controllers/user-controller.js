const User = require('../models/user-model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');



//Admin get all users
const index = async (req, res) => {
  const query = await User.find({});
  query instanceof mongoose.Query;
  const docs = await query;
  res.send(docs);
  return res;
}

const createUser = (req, res) => {
  console.log("Test...");
  const { username, password, isAdmin, email } = req.body;

    const newUser = new User({
      username, 
      password, 
      isAdmin, 
      email
    })

    //crypto function
    newUser.setPassword(password);

    newUser.save()
    .then(()=>res.json('User added!'))
    .catch(err=> res.status(400).json('Error: ' + err));
}


//admin edit user
const editUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.setPassword(req.body.password);
      user.isAdmin = req.body.isAdmin;
      user.email = req.body.email;
    
      user.save()
        .then(()=> res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
}


//admin delete user
const deleteUser = (req, res)=> {
  User.findByIdAndDelete(req.params.id)
  .then(()=> res.json('User deleted.'))
  .catch(err => res.status(400).json('Error: ' + err));
};


//admin find one user
const findOneUser = (req, res)=> {
  console.log("User id: ", req.params.id);
  User.findById(req.params.id)
  .then(User => res.json(User))
  .catch(err => res.status(400).json('Error: ' + err));
};

//admin login
const login = async (req, res) => {
  const {username, password} = await req.body;
  User.findOne({username : username }, function(err, user) {
    if (user === null) {
      res.status(400).send({
        message: 'User not found.'
      });
    }
    else {
      console.log(user);
      
      if (user.validPassword(password)) {
        let token = jwt.sign({username: username},
          user.isAdmin? process.env.ADMIN_SECRET : process.env.TOKEN_SECRET,
          {expiresIn: '24h'})

        res.status(201).json({
          success: true,
          message: 'Authentication successful',
          token: token
        });
      }
      else {
        res.status(400).send({
          message: 'Wrong Password'
        })
      }
    }
  })
  return res
}




// for admin
const allUsers = async (req, res) => {
  await User.find().sort("-createdAt");
  return res;
}

module.exports = { index, createUser, editUser, deleteUser, findOneUser, login, allUsers }