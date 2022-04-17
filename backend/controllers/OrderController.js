const order = require("../models/orderModel")
// const asyncFunc = require("express-async-handler");


exports.createOrder = async (req, res, next) => {
    const orderItems = req.body.carts;
    const shippingAddress = req.body.shippingAddress;
    const paymentMethod = req.body.paymentMethod;
    // const paymentResult = req.body.paymentResult;
    const itemsPrice = req.body.ItemPrice;
    const shippingPrice = req.body.shippingPrice;
    const taxPrice = req.body.taxPrice;
    const totalPrice = req.body.totalPrice;
    const user = req.payload
    try {
        if (orderItems.length === 0) {
            const error = new Error("cart is Empty");
            error.statusCode = 400;
            throw error;
        }
        const Order = new order({
            orderItems: orderItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            // paymentResult: paymentResult,
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice,
            user: user._id,
        })
        console.log(Order)
        const savedOrder = await Order.save();
        res.status(201).json({
            message: "done",
            order: savedOrder
        })
    } catch (error) {
        next(error);
    }
}

exports.getOrderDetail = async (req, res, next) => {
    const id = req.params.id;
    try {
        const orderDetail = await order.findById(id);
        if (!orderDetail) {
            const error = new Error("No Order Found");
            error.statusCode = 404;
            throw error;
        }
        res.status(201).json({
            order: orderDetail
        })
    } catch (error) {
        next(error)
    }
}