const express = require('express');
const router = express.Router();
const middleware = require('../routes/token_middleware');
const { index, createItem, editItem, deleteItem, findOneItem } = require("../controllers/item-controller");

//here we are going to create routes

router.get('/', index);
router.post('/create', createItem);
router.patch('/edit/:id', middleware.checkAdminToken, editItem) //routes tested and work
router.delete('/delete/:id', middleware.checkAdminToken, deleteItem); //routes tested and work
router.get('/:id', findOneItem);


module.exports = router;