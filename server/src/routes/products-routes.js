const express = require("express");
const Products = require("../modals/products");
const routes = express.Router();
const sharp = require("sharp");
const multer = require("multer");

const fileUpload = multer({
  limits: {
    fileSize: 5000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a jpg/png/jpeg file"));
    }
    cb(undefined, true);
  }
});

routes.post(
  "/products/image/:_id",
  fileUpload.single("file"),
  async (req, res) => {
    try {
      const buffer = await sharp(req.file.buffer)
        .png()
        .toBuffer();

      const product = await Products.findOne({ _id: req.params._id });

      product.image = buffer;
      await product.save();
      res.send({ product, success: true });
    } catch (e) {
      res.send({ e, success: false });
    }
  }
);
routes.post("/products", async (req, res) => {
  try {
    const product = await Products({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      subcategory: req.body.subcategory,
      price: req.body.price
    }).save();

    res.send({ product, success: true });
  } catch (e) {
    res.send({ e, success: false });
  }
});
routes.get("/products", async (req, res) => {
  try {
    const { skip, limit, category, subcategory, search } = req.query;
    const products = await Products.find({
      $and: [
        { category: { $regex: `${category}`, $options: "i" } },
        { subcategory: { $regex: `${subcategory}`, $options: "i" } },
        { name: { $regex: `${search}`, $options: "i" } }
      ]
    }).setOptions({
      skip: parseInt(skip),
      limit: parseInt(limit)
    });
    if (!products) {
      res.send({ message: "Products not found", success: false });
    }

    res.send({ success: true, products });
  } catch (e) {
    res.send({ message: "Products not found", success: false });
  }
});
routes.get("/products/image/:_id", async (req, res) => {
  try {
    const products = await Products.findOne({ _id: req.params._id });

    res.send({ image: products.image, success: true });
  } catch (e) {
    res.send({ message: "Products not found", success: false });
  }
});
routes.get("/products/myproduct/:_id", async (req, res) => {
  try {
    const product = await Products.findOne({ _id: req.params._id });
    if (!product) {
      res.send({ success: false, message: "Product not found" });
    }
    await product.populate("productDetail").execPopulate();

    res.send({ product, success: true });
  } catch (e) {}
});
routes.patch("/products/myproduct/:_id", async (req, res) => {
  const changeProduct = req.body;
  const fieldsToUpdate = Object.keys(changeProduct);
  const fieldsInModel = [
    "name",
    "price",
    "description",
    "category",
    "subcategory"
  ];
  const isUpdateAllowed = fieldsToUpdate.every(field =>
    fieldsInModel.includes(field)
  );
  if (!isUpdateAllowed) {
    return res.send({ message: "Error Not Found", success: false });
  }
  try {
    const product = await Products.findOne({
      _id: req.params._id
    });

    if (!product) {
      return res.send({ message: "Error Not Found", success: false });
    }

    Object.assign(product, changeProduct);
    await product.save();
    res.send({ product, success: true });
  } catch (e) {
    res.send({ message: "Error Not Found", success: false });
  }
});

routes.delete("/products/myproduct/:_id", async (req, res) => {
  try {
    const product = await Products.findById({ _id: req.params._id });
    await product.remove();
    res.send({ product, success: true });
  } catch (e) {
    res.send({ error: "Error Not Found", success: false });
  }
});

module.exports = routes;
