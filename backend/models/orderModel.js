const mongoose = require("mongoose");
const schema = mongoose.Schema
const orderSchema = new schema({
    orderItems: [{
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        // product: {
        //     type: schema.Types.ObjectId,
        //     ref: "Products",
        //     required: true
        // }
    }],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        // lat: Number,
        // lng: Number,
    },
    paymentMethod: { type: String, required: true },
    // paymentResult: {
    //     id: String,
    //     status: String,
    //     update_time: String,
    //     email_address: String,
    // },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: schema.Types.ObjectId, ref: 'Users', required: true },
    // seller: { type: schema.Types.ObjectID, ref: 'Users' },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
}, {
    timestamps: true
})

module.exports = mongoose.model("Order", orderSchema)