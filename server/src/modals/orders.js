const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

const orderSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  country: {
    type: String
  },
  address: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  phone: {
    type: String
  },
  products: [
    {
      product_id: {
        type: Number,
        require: true
      },
      product_name: {
        type: String
      },
      quantity: {
        type: Number
      },
      size: {
        type: String
      },
      category: {
        type: String
      },
      subcategory: {
        type: String
      },
      price: {
        type: Number
      }
    }
  ],
  isDelivered: {
    type: Boolean,
    default: false
  },
  Date: {
    type: String,
    default:
      new Date().getUTCDate() +
      "-" +
      parseInt(new Date().getUTCMonth() + 1) +
      "-" +
      new Date().getUTCFullYear()
  },
  total: {
    type: Number
  }
});
autoIncrement.initialize(mongoose.connection);
orderSchema.plugin(autoIncrement.plugin, "Orders");

const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;
