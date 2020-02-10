const express = require("express");
const ProductDetail = require("../modals/productDescriptions");
const Products = require("../modals/products");
const routes = express.Router();

routes.post("/products_details/:_id", async (req, res) => {
  try {
    const product = await Products.findById(req.params._id);
    if (!product) {
      res.send({ success: false });
    }
    const productSize = await ProductDetail.findOne({
      size: req.body.size,
      product: req.params._id
    });

    if (!productSize && product) {
      const productDetail = await new ProductDetail({
        ...req.body,
        product: req.params._id
      }).save();
      res.send({ productDetail, success: true });
    } else {
      res.send({ message: "Product Size Already Exists", success: false });
    }
  } catch (e) {
    res.send({ e, success: false });
  }
});
routes.get("/searchproducts", async (req, res) => {
  try {
    const { name } = req.query;

    const products = await ProductDetail.find({}).populate({
      path: "product",
      match: {
        $and: [{ name: { $regex: `${name}`, $options: "i" } }]
      }
    });

    if (!products) {
      res.send({ error: "Products not found", success: false });
    }

    res.send({ products, success: true });
  } catch (e) {
    res.send({ error: "Products not found", success: false });
  }
});
routes.get("/products_details", async (req, res) => {
  try {
    const { limit, skip } = req.query;

    const product_details = await ProductDetail.find({})
      .populate({
        path: "product"
      })
      .setOptions({
        skip: parseInt(skip),
        limit: parseInt(limit)
      });

    if (!product_details) {
      res.send({ error: "Products not found", success: false });
    }

    res.send({ product_details, success: true });
  } catch (e) {
    res.send({ message: "Products not found", success: false });
  }
});
routes.get("/products_details/myproduct/:_id", async (req, res) => {
  try {
    const product = await ProductDetail.findById({
      _id: req.params._id
    }).populate({
      path: "product"
    });
    if (!product) {
      res.send({ success: false, message: "Product not found" });
    }
    res.send({ product, success: true });
  } catch (e) {
    res.send({ message: "Product not found", success: false });
  }
});
routes.get("/products_details/product/:_id", async (req, res) => {
  try {
    const product = await ProductDetail.find({ product: req.params._id });
    if (!product) {
      res.send({ success: false, message: "Product not found" });
    }

    res.send({ product, success: true });
  } catch (e) {
    res.send({ message: "Product not found", success: false });
  }
});

routes.patch("/products_details/myproduct/:_id", async (req, res) => {
  const changeProduct = req.body;
  const fieldsToUpdate = Object.keys(changeProduct);
  const fieldsInModel = ["quantity", "size"];
  const isUpdateAllowed = fieldsToUpdate.every(field =>
    fieldsInModel.includes(field)
  );
  if (!isUpdateAllowed) {
    return res.send({ message: "Error Not Found", success: false });
  }
  try {
    const product = await ProductDetail.findOne({
      _id: req.params._id
    });
    if (!product) {
      return res.send({ message: "Error Not Found", success: false });
    }

    if (product.size === req.body.size) {
      Object.assign(product, changeProduct);
      await product.save();
      res.send({ product, success: true });
    } else {
      res.send({ message: "Product Size Already Exists", success: false });
    }
  } catch (e) {
    res.send({ message: "Error Not Found", success: false });
  }
});

routes.delete("/products_details/myproduct/:_id", async (req, res) => {
  try {
    const product = await ProductDetail.findById({ _id: req.params._id });
    await product.remove();
    res.send({ product, success: true });
  } catch (e) {
    res.send({ error: "Error Not Found", success: false });
  }
});

module.exports = routes;
