import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      require: true,
    },
    productName: {
      type: String,
      require: true,
    },
    biddDetails: [
      {
        bidder: {
          type: String,
          require: true,
        },
        bidderAmount: {
          type: Number,
          require: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Auction = mongoose.model("Auction", auctionSchema);

export default Auction;
