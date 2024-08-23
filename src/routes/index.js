const express = require('express');
const routerUser = require('./user.router');
const routerProduct = require('./product.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users',routerUser)

router.use('/products',routerProduct)

module.exports = router;

