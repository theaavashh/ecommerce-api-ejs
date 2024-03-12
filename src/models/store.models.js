import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      require: true,
    },
    logo: {
      type: String,
      require: true,
    },
    storeType: {
      type: String,
      require: true,
    },
    location: {
      type: { type: String, require: true },
      coordinates: [],
    },
    userId: {
      type: String,
      require: true,
    },
  },

  { timestamps: true }
);

storeSchema.index({ location: "2dsphere" });

const Store = mongoose.model("Store", storeSchema);

export default Store;
