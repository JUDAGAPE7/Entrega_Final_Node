const express = require('express');
const routerUser = require('./user.router');
const routerProduct = require('./product.router');
const routerCategory = require('./category.router');
const { verifyJWT } = require('../utils/verifyJWT');
const routerCart = require('./cart.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users',routerUser)
router.use("/categories", routerCategory)
router.use('/products',routerProduct)
router.use('/cart', verifyJWT, routerCart) //🔏

module.exports = router;

