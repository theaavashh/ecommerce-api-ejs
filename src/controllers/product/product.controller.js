import Auction from "../../models/auction.models.js";
import Order from "../../models/order.models.js";
import Product from "../../models/product.models.js";
import Store from "../../models/store.models.js";
import User from "../../models/user.models.js";

const obj = [];
let total = "";

const addProduct = async (req, res) => {
  try {
    const productDetails = req.body;
    console.log(productDetails);
    const data = await Product.create({
      ...productDetails,
      avatar: req.file.filename,
    });
    data
      ? res.render("product/addProduct.ejs", {
          msg: "Product added successfully",
        })
      : res.render("product/addProduct.ejs", { msg: "Product failed to add" });
  } catch (e) {
    res.json({ success: false, message: e });
  }
};

const viewProduct = async (req, res) => {
  const data = await Product.find();
  res.render("product/viewProduct.ejs", { data });
};

const editProduct = async (req, res) => {
  const details = req.body;
  const data = await Product.findByIdAndUpdate(
    { _id: details._id },
    { ...details }
  );
  data
    ? res.redirect("allproduct")
    : res.json({ success: false, msg: "failed to update details" });
};

const deleteProduct = async (req, res) => {
  const details = await Product.findByIdAndDelete({ _id: req.params.id });
  if (details) {
    const data = await Product.find();
    res.render("product/viewProduct.ejs", { data });
  }
};

const renderProduct = async (req, res) => {
  const id = req.params.id;
  const details = await Product.findById({ _id: id });
  res.render("product/editProduct.ejs", { details });
};

const addProductUI = async (req, res) => {
  const data = await Store.find();
  res.render("product/addProduct.ejs", { data });
};

const userProduct = async (req, res) => {
  const time = new Date();
  const category = req.query.category;
  const filterCategory = await Product.find({ productType: category });
  const auctionProduct = await Product.find({ productStatus: "auction" });
  const mrpProduct = await Product.find({ productStatus: "mrp" });
  const profilePicture = await User.find({ email: req.session.email });
  res.render("users/productInterface.ejs", {
    time,
    profilePicture,
    filterCategory,
    auctionProduct,
    mrpProduct,
    data: obj,
    userId: req.session.fullname,
  });
};

const addToCart = async (req, res) => {
  const data = await Product.findById({ _id: req.body._id });
  obj.push(data);
  res.redirect("/api/v1/site");
};

const cart = async (req, res) => {
  const total = obj.reduce((a, b) => {
    return a + b.price;
  }, 0);
  res.render("./users/cart.ejs", { data: obj, total });
};

const order = async (req, res) => {
  const total = obj.reduce((a, b) => {
    return a + b.price;
  }, 0);
  res.render("./users/order.ejs", {
    data: obj,
    total,
    fullname: req.session.fullname,
    contact: req.session.contact,
  });
};

const placeOrder = async (req, res) => {
  const details = req.body;
  const product = details.productDetails;
  try {
    const arr = product.toString();
    details.productDetails = arr;
    if (+details.totalprice <= 800) {
      res.json({ success: false, msg: "Thresold of more than 799" });
    } else {
      const data = await Order.create(details);
      obj.length = 0;
      res.render("./users/success.ejs");
    }
  } catch (e) {
    res.json({ success: false, msg: "Bad request from user end" });
  }
};

const vieworder = async (req, res) => {
  try {
    const data = await Order.find();
    const details = [...data];
    if (req.query.total) {
      const data = details.filter((element) => {
        return +element.totalprice >= 1500;
      });
      res.render("./product/viewOrder.ejs", { data });
    } else {
      res.render("./product/viewOrder.ejs", { data });
    }
  } catch (e) {
    res.json({ success: false, msg: "Failed to fetch order details" });
  }
};

const nearbyStore = async (req, res) => {
  const time = new Date();
  const data = await Store.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [
            parseFloat(req.body.longitude),
            parseFloat(req.body.latitude),
          ],
        },
        key: "location",
        maxDistance: parseFloat(1000) * 1609,
        distanceField: "dist.calculated",
        spherical: true,
      },
    },
  ]);
  const auctionProduct = await Product.find({ productStatus: "auction" });
  const mrpProduct = await Product.find({ productStatus: "mrp" });
  const nearbyProduct = await Product.find({ storeOf: data[0].storeName });
  res.render("users/productInterface.ejs", {
    time,
    auctionProduct,
    mrpProduct,
    data: obj,
    userId: req.session.fullname,
    nearbyProduct,
  });
};

const biddingData = async (req, res) => {
  const time = new Date();
  const { bidAmount, basePrice } = req.body;
  if (+bidAmount < +basePrice) {
    res.json({ success: false, msg: "Bid must be greater than base price" });
  } else {
    const data = await Auction.create({
      productId: req.body.productId,
      productName: req.body.productName,
      biddDetails: [
        { bidder: req.body.userId, bidderAmount: req.body.bidAmount },
      ],
    });
    const auctionProduct = await Product.find({ productStatus: "auction" });
    const mrpProduct = await Product.find({ productStatus: "mrp" });
    data
      ? res.render("users/productInterface.ejs", {
          time,
          auctionProduct,
          mrpProduct,
          data: obj,
          userId: req.session.fullname,
        })
      : res.json({ success: false, msg: "failed to process request" });
  }
};

const viewAuction = async (req, res) => {
  const data = await Auction.find();
  res.render("product/viewAuction.ejs", { data });
};

const filterHighBidder = async (req, res) => {
  const highbidder = await Auction.find({ productId: req.body.productId });
  const data = highbidder.map((element) => {
    return element.biddDetails[0];
  });
  const result = data.reduce((a, b) => {
    return a > b.bidderAmount ? a : b;
  }, 0);
  const updateResult = {
    productId: req.body.productId,
    productName: highbidder[0].productName,
    biddDetails: [],
  };
  updateResult.biddDetails.push(result);
  const highBid = [];
  highBid.push(updateResult);
  res.render("product/viewAuction.ejs", { data: highBid });
};

export {
  addProduct,
  viewProduct,
  editProduct,
  deleteProduct,
  renderProduct,
  userProduct,
  addToCart,
  cart,
  addProductUI,
  order,
  placeOrder,
  vieworder,
  nearbyStore,
  biddingData,
  viewAuction,
  filterHighBidder,
};
