import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    contact: {
      type: Number,
      require: true,
    },
    shippingAddress: {
      type: String,
      require: true,
    },
    paymentMode: {
      type: String,
      require: true,
    },
    productDetails: {
      type: String,
      require: true,
    },
    totalprice: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
