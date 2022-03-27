const product = require("../models/productModel")
const asyncFunc = require("express-async-handler");

exports.getAllProducts = asyncFunc(async (req, res, next) => {
    const productList = await product.find();
    res.json({
        data: productList,
    })
})

exports.getProductDetails = asyncFunc(async (req, res, next) => {
    const id = req.params.product_id
    const productDetails = await product.findById(id)
    // data.products.find(x => x._id === id);
    console.log(productDetails)
    if (productDetails) {
        res.status(200).json({
            message:"Done",
            products: productDetails
        })
    } else {
        res.status(404).json({
            message: "product Not found"
        })
    }
}
)

