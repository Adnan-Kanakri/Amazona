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

exports.getOrderDetails = async (req, res, next) => {
    try {

        const userId = req.payload._id
        // console.log(userId)
        const userOrders = await order.find({ user: userId })
        if (userOrders) {

            // console.log(userOrders.shippingAddress)

            // let test = userOrders.forEach(element => {
            //     const or = {
            //         _id: element._id,
            //         createdAt: element.createdAt,
            //         totalPrice: element.totalPrice,
            //         isPaid: element.isPaid,
            //         paidAt: element.paidAt,
            //         isDelivered: element.isDelivered,
            //         deliveredAt: element.deliveredAt,
            //     }
            //     return or
            // });

            // for (const key in userOrders) {
            //     return order = {
            //         _id: userOrders[key]._id,
            //         createdAt: userOrders[key].createdAt,
            //         totalPrice: userOrders[key].totalPrice,
            //         isPaid: userOrders[key].isPaid,
            //         paidAt: userOrders[key].paidAt,
            //         isDelivered: userOrders[key].isDelivered,
            //         deliveredAt: userOrders[key].deliveredAt,
            //     }
            // }

            // for (let key = 0; key < userOrders.length; key++) {
            //     let order = {
            //         _id: userOrders[key]._id,
            //         createdAt: userOrders[key].createdAt,
            //         totalPrice: userOrders[key].totalPrice,
            //         isPaid: userOrders[key].isPaid,
            //         paidAt: userOrders[key].paidAt,
            //         isDelivered: userOrders[key].isDelivered,
            //         deliveredAt: userOrders[key].deliveredAt,
            //     }
            // }


            // console.log(order)


            /// id createdAt totalPrice isPaid paidAt isDelivered deliveredAt
            res.status(200).json({
                orders: userOrders
                // {
                //     _id: userOrders._id,
                //     createdAt: userOrders.createdAt,
                //     totalPrice: userOrders.totalPrice,
                //     isPaid: userOrders.isPaid,
                //     paidAt: userOrders.paidAt,
                //     isDelivered: userOrders.isDelivered,
                //     deliveredAt: userOrders.deliveredAt,
                // }
            })
        } else {
            const error = new Error("No Orders Found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
}
