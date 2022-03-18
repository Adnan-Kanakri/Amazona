const data = require("../helper/Data")

exports.getAllProducts = (req, res, next) => {
    // console.log(req);
    res.json({
        data: data,
    })
}

exports.getProductDetails = (req, res, next) => {
    // console.log(req.params)
    const id = req.params.product_id
    const product = data.products.find(x => x._id === id);
    if (product) {
        // console.log(product)
        res.status(200).json({
            data: product
        })
    } else {
        res.status(404).json({
            message: "product Not found"
        })
    }
}


