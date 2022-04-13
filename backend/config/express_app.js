const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const fs = require("fs");
const app = express();
// const route = require("./routes");
const ProductRoute = require('../routes/ProductRoute')
const orderRoutes = require('../routes/OrderRoute')
const usersRoutes = require("../routes/usersRouters")

const helmet = require("helmet");
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));

const accessStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
app.use(morgan("dev", { stream: accessStream }));
app.use(helmet());

//  import route

app.use('/api/products', ProductRoute)
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes)

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      error: error.message,
      code: error.statusCode || 500,
    },
  });
})

module.exports = app;
