const data = require("../helper/Data")
const product = require("../models/productModel")

const asyncFunc = require("express-async-handler");


exports.seedProducts = asyncFunc(async (req, res, next) => {
    const productData = data.products;
    await product.insertMany(productData);
    res.send({
        data: productData
    })
})



