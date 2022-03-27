const express = require('express');
const Route = express.Router();
const ProductsController = require('../controllers/ProductController')

const seedProducts = require("../seed/seedProducts")

Route.get("", ProductsController.getAllProducts)
Route.get("/seed/product", seedProducts.seedProducts)
Route.get("/:product_id", ProductsController.getProductDetails)



module.exports = Route;



