const mongoose = require("mongoose");
const ProductDetails = require("./productDescriptions");
var autoIncrement = require("mongoose-auto-increment");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String
    },
    image: {
      type: Buffer
    },
    category: {
      type: String,
      uppercase: true
    },
    subcategory: {
      type: String,
      uppercase: true
    },
    price: {
      type: Number
    },
    description: {
      type: String
    }
  },
  { toObject: { virtuals: true } }
);
productSchema.statics.findByCredentials = async name => {
  const product = await Products.findOne({ name });

  if (!product) {
    throw new Error("Not Found");
  }

  return product;
};
productSchema.virtual("productDetail", {
  ref: "ProductDescriptions",
  localField: "_id",
  foreignField: "product"
});
productSchema.virtual("orders", {
  ref: "Orders",
  localField: "_id",
  foreignField: "product"
});
productSchema.methods.toJSON = function() {
  const product = this;
  const publicProductData = product.toObject();

  return publicProductData;
};
productSchema.pre("remove", async function(next) {
  const productDetails = this;
  await ProductDetails.deleteMany({ product: productDetails._id });
  next();
});
autoIncrement.initialize(mongoose.connection);
productSchema.plugin(autoIncrement.plugin, "Products");

const Products = mongoose.model("Products", productSchema);
module.exports = Products;
