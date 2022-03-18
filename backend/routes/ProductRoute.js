const express = require('express');
const Route = express.Router();
const ProductsController = require('../controllers/ProductController')



Route.get("", ProductsController.getAllProducts)
Route.get("/:product_id", ProductsController.getProductDetails)

module.exports = Route;



