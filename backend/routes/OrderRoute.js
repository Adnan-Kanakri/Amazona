const express = require('express');
const Route = express.Router();

const OrderController = require('../controllers/OrderController')
const isAuth = require("../middleware/AuthMiddleware");

Route.post("/order",isAuth,OrderController.createOrder)



module.exports = Route;
