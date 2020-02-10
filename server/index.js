const express = require("express");
const profileRoutes = require("./src/routes/profile-routes");
const productRoutes = require("./src/routes/products-routes");
const productDetailRoutes = require("./src/routes/productsDetail-routes");
const orderRoutes = require("./src/routes/orders-routes");
const keyRoutes = require("./src/routes/key-routes");
require("./src/db/mongoose");
const app = express();

app.use(express.json());
app.use(profileRoutes);
app.use(productRoutes);
app.use(productDetailRoutes);
app.use(orderRoutes);
app.use(keyRoutes);

const port = process.env.PORT;

app.listen(port, () => console.log("Server is up on port ", port));
