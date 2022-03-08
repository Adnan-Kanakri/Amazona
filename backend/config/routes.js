const ProductRoute = require('../routes/ProductRoute')


exports.allRoutes = (app) => {
    app.use(ProductRoute);

}