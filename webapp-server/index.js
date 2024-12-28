const express = require("express");

const productCategories = require("./routes/productCategories");
const products = require("./routes/product");
const users = require("./routes/users");
const orders = require("./routes/order");
const cors = require("cors");

const app = express();

const PORT = 5001;
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.use("/productCategories", productCategories);
app.use("/products", products);
app.use("/products:id", products);
app.use("/users", users);
app.use("/orders", orders);

const server = app.listen(PORT, () => {
  console.log("App is running in Port->5001");
});