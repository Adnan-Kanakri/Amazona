const express = require('express');
const Route = express.Router();

const OrderController = require('../controllers/OrderController')
const isAuth = require("../middleware/AuthMiddleware");

Route.post("/order", isAuth, OrderController.createOrder)
Route.get("/order/:id", isAuth, OrderController.getOrderDetail)

Route.get("/order-list", isAuth, OrderController.getOrderDetails)


module.exports = Route;
