const express = require("express");
const Orders = require("../modals/orders");
const { main, receive } = require("../email/email");
const routes = express.Router();

routes.post("/orders", async (req, res) => {
  try {
    const orders = await new Orders({
      name: req.body.name,
      email: req.body.email,
      country: req.body.country,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      phone: req.body.phone,
      total: req.body.total,
      products: req.body.products
    }).save();
    main(orders._id, orders.email);
    receive(orders._id, orders);
    res.send({ orders, success: true });
  } catch (e) {
    res.send({ e, success: false });
  }
});
routes.patch("/orders/:_id", async (req, res) => {
  try {
    const orders = await Orders.findById(req.params._id);
    if (!orders) {
      res.send({ success: false });
    }
    orders.products = orders.products.concat({
      product_id: req.body.product_id,
      product_name: req.body.product_name,
      quantity: req.body.quantity,
      size: req.body.size,
      category: req.body.category,
      subcategory: req.body.subcategory,
      price: req.body.price
    });
    await orders.save();
    if (req.query.flag === true) {
      receive(orders._id, orders.products);
    }
    res.send({ orders, success: true });
  } catch (e) {
    res.send({ e, success: false });
  }
});
routes.patch("/order/delivered/:_id", async (req, res) => {
  const changedOrder = req.body;
  const fieldsToUpdate = Object.keys(changedOrder);
  const fieldsInModel = ["isDelivered"];
  const isUpdateAllowed = fieldsToUpdate.every(field =>
    fieldsInModel.includes(field)
  );
  if (!isUpdateAllowed) {
    return res.send({ error: "Invalid fields!" });
  }
  try {
    const orders = await Orders.findOne({ _id: req.params._id });

    if (!orders) {
      res.send({ success: false });
    }
    Object.assign(orders, changedOrder);
    await orders.save();
    res.send({ orders, success: true });
  } catch (e) {
    res.send({ e, success: false });
  }
});
routes.delete("/orders/myorder/:_id", async (req, res) => {
  try {
    const order = await Orders.findById(req.params._id);
    await order.remove();
    res.send({ message: "Deleted Successfully", success: true });
  } catch (e) {
    res.send({ e, success: false });
  }
});
routes.get("/searchorders", async (req, res) => {
  try {
    const { isDelivered } = req.query;

    const orders = await Orders.find({ isDelivered });

    if (!orders) {
      res.send({ error: "Orders not found", success: false });
    }

    res.send({ orders, success: true });
  } catch (e) {
    res.send({ error: "Orders not found", success: false });
  }
});
routes.get("/orders", async (req, res) => {
  try {
    const { limit, skip } = req.query;

    const orders = await Orders.find({})
      .populate({
        path: "product"
      })
      .setOptions({
        skip: parseInt(skip),
        limit: parseInt(limit)
      });

    if (!orders) {
      res.send({ error: "Orders not found", success: false });
    }

    res.send({ orders, success: true });
  } catch (e) {
    res.send({ message: "Orders not found", success: false });
  }
});
routes.get("/orders/myorders", async (req, res) => {
  try {
    const orders = await Orders.findOne({
      _id: req.query._id,
      isDelivered: req.query.isDelivered
    });

    if (!orders) {
      res.send({ success: false, message: "Order not found" });
    }
    res.send({ orders, success: true });
  } catch (e) {
    res.send({ message: "Order not found", success: false });
  }
});
routes.patch("/orders/myorder/:_id", async (req, res) => {
  const changeOrder = req.body;
  const fieldsToUpdate = Object.keys(changeOrder);
  const fieldsInModel = ["isDelivered"];
  const isUpdateAllowed = fieldsToUpdate.every(field =>
    fieldsInModel.includes(field)
  );
  if (!isUpdateAllowed) {
    return res.send({ message: "Error Not Found", success: false });
  }
  try {
    const order = await Orders.findOne({
      _id: req.params._id
    });

    if (!order) {
      return res.send({ message: "Error Not Found", success: false });
    }

    Object.assign(order, changeOrder);
    await order.save();
    res.send({ order, success: true });
  } catch (e) {
    res.send({ message: "Error Not Found", success: false });
  }
});

routes.delete("/orders/myorder/:_id", async (req, res) => {
  try {
    const order = await Orders.findById({ _id: req.params._id });
    await order.remove();
    res.send({ order, success: true });
  } catch (e) {
    res.send({ error: "Error Not Found", success: false });
  }
});

module.exports = routes;
