

const express = require('express');
const router = express.Router();
//const middleware = require('../routes/token_middleware');

const { index, createUser, editUser, deleteUser, findOneUser, login } = require("../controllers/user-controller");




router.get('/', index);
router.post('/create', createUser);
router.put('/edit/:id', editUser)
router.delete('/delete/:id', deleteUser);
router.get('/:id', findOneUser);
router.post('/login', login);

module.exports = router;