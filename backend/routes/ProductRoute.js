const express = require('express');
const Route = express.Router();
const ProductsController = require('../controllers/ProductController')



Route.get("/api/products", ProductsController.getAllProducts)


module.exports = Route;



