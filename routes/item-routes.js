//Item routes 
//Middleware required here so that it can be passed before the edit and delete routes thereby enabling only the admin to access it. 

const express = require('express');
const router = express.Router();


const middleware = require('../routes/token_middleware');

//CRUD functions of item-controller required here
const { index, createItem, editItem, deleteItem, findOneItem } = require("../controllers/item-controller");



router.get('/', index);
router.post('/create', createItem);
router.patch('/edit/:id', middleware.checkAdminToken, editItem) //routes tested and work
router.delete('/delete/:id', middleware.checkAdminToken, deleteItem); //routes tested and work
router.get('/:id', findOneItem);


module.exports = router;