

const express = require('express');
const router = express.Router();
const middleware = require('../routes/token_middleware');

const { index, createUser, editUser, deleteUser, findOneUser, login, dashboard } = require("../controllers/user-controller");




router.get('/', index); //go to production - CHANGE TO INCLUDE middleware here
router.post('/create', createUser); //go to production - CHANGE TO INCLUDE in middleware here
router.patch('/edit/:id', middleware.checkAdminToken, editUser) //this works and will still salt password if edit
router.delete('/delete/:id',  middleware.checkAdminToken, deleteUser); //this works for non admin 
router.get('/dashboard', middleware.checkAdminToken, dashboard);
router.get('/:id', middleware.checkAdminToken, findOneUser); //this works for non admin and admin
router.post('/login', login);




module.exports = router;