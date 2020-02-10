const mongoose = require("mongoose");

const productDescriptionSchema = mongoose.Schema(
  {
    quantity: {
      type: Number
    },
    size: {
      type: String
    },
    product: {
      type: Number,
      require: true,
      ref: "Products"
    }
  },
  { toObject: { timestamps: true } }
);

const ProductDescriptions = mongoose.model(
  "ProductDescriptions",
  productDescriptionSchema
);
module.exports = ProductDescriptions;
