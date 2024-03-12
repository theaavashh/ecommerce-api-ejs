import { pool } from "../../config/db.config.js";
import Auction from "../../models/auction.models.js";
import Order from "../../models/order.models.js";
import Product from "../../models/product.models.js";
import Store from "../../models/store.models.js";
import User from "../../models/user.models.js";

const obj = [];
let total = "";

const addProduct = async (req, res) => {
  try {
    req.body.productImage = req.file.filename;
    const {
      productName,
      productType,
      description,
      productStatus,
      price,
      quantity,
      storeOf,
      productImage,
    } = req.body;
    await pool.query(
      "Insert into product(productname,producttype,productdescription,productstatus,productprice,quantity,productimage,storetype) Values($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        productName,
        productType,
        description,
        productStatus,
        price,
        quantity,
        productImage,
        storeOf,
      ]
    );
    res.render("product/addProduct.ejs", {
      msg: "Product added successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e });
  }
};

const viewProduct = async (req, res) => {
  const data = await pool.query(
    "Select st.storename, st.storelogo, pt.* from store st INNER Join product pt on st.id=pt.storetype"
  );
  res.render("product/viewProduct.ejs", { data: data.rows });
};

const deleteProduct = async (req, res) => {
  const details = await pool.query("Delete from product where id=$1", [
    req.params.id,
  ]);
  if (details) {
    const data = await pool.query("Select * from product");
    res.render("product/viewProduct.ejs", { data: data.rows });
  }
};

const addProductUI = async (req, res) => {
  const data = await pool.query("Select * from store");
  res.render("product/addProduct.ejs", { data: data.rows });
};

const userProduct = async (req, res) => {
  const category = req.query.category;
  let filterCategory = await pool.query(
    "Select st.storename, pt.* from store st INNER JOIN product pt ON st.id=pt.storetype where producttype=$1",
    [category]
  );
  let auctionProduct = await pool.query(
    "Select st.storename, pt.* from store st INNER JOIN product pt ON st.id=pt.storetype where productstatus=$1",
    ["auction"]
  );
  let mrpProduct = await pool.query(
    "Select st.storename, pt.* from store st INNER JOIN product pt ON st.id=pt.storetype where productstatus=$1",
    ["mrp"]
  );
  filterCategory = filterCategory.rows;
  auctionProduct = auctionProduct.rows;
  mrpProduct = mrpProduct.rows;
  const pic = await pool.query(
    "Select avatar from useregistration where id=$1",
    [11]
  );
  const profilePicture = pic.rows[0].avatar;
  res.render("users/productInterface.ejs", {
    profilePicture,
    filterCategory,
    auctionProduct,
    mrpProduct,
    data: obj,
    userId: req.session.fullname,
  });
};

const addToCart = async (req, res) => {
  const data = await pool.query("Select * from product where id=$1", [
    req.body._id,
  ]);
  obj.push(data.rows[0]);
  res.redirect("/api/v1/site");
};

const cart = async (req, res) => {
  const total = obj.reduce((a, b) => {
    return a + parseInt(b.productprice);
  }, 0);
  res.render("./users/cart.ejs", { data: obj, total });
};

const order = async (req, res) => {
  const total = obj.reduce((a, b) => {
    return a + parseInt(b.productprice);
  }, 0);
  res.render("./users/order.ejs", {
    data: obj,
    total,
    fullname: req.session.fullname,
    contact: req.session.contact,
  });
};

const placeOrder = async (req, res) => {
  const product = req.body.productDetails;
  const { fullName, contact, shippingAddress, paymentMode, totalprice } =
    req.body;

  try {
    const arr = product.toString();
    const productInfo = arr;
    if (totalprice <= 80) {
      res.json({ success: false, msg: "Thresold of more than 200" });
    } else {
      const data = await pool.query(
        "Insert into orders (fullname, contact, shippingaddress, paymnentmode, totalprice, productdetails) Values($1,$2,$3,$4,$5,$6)",
        [
          fullName,
          contact,
          shippingAddress,
          paymentMode,
          totalprice,
          productInfo,
        ]
      );
      obj.length = 0;
      res.render("./users/success.ejs");
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false, msg: "Bad request from user end" });
  }
};

const vieworder = async (req, res) => {
  try {
    const data = await pool.query("Select * from orders");
    const details = data.rows;
    if (req.query.total) {
      const data = details.filter((element) => {
        return +element.totalprice >= 1500;
      });
      res.render("./product/viewOrder.ejs", { data });
    } else {
      res.render("./product/viewOrder.ejs", { data: data.rows });
    }
  } catch (e) {
    res.json({ success: false, msg: "Failed to fetch order details" });
  }
};

const biddingData = async (req, res) => {
  try {
    const { bidAmount, basePrice, productId, userId } = req.body;
    console.log(req.body);
    if (+bidAmount < +basePrice) {
      res.json({ success: false, msg: "Bid must be greater than base price" });
    } else {
      await pool.query(
        "Insert into auction(bidamount,baseprice,userid,productid) Values($1,$2,$3,$4)",
        [bidAmount, basePrice, userId, productId]
      );
      let auctionProduct = await pool.query(
        "Select st.storename, pt.* from store st INNER JOIN product pt ON st.id=pt.storetype where productstatus=$1",
        ["auction"]
      );
      let mrpProduct = await pool.query(
        "Select st.storename, pt.* from store st INNER JOIN product pt ON st.id=pt.storetype where productstatus=$1",
        ["mrp"]
      );
      auctionProduct = auctionProduct.rows;
      mrpProduct = mrpProduct.rows;
      const pic = await pool.query(
        "Select avatar from useregistration where fullname=$1",
        [userId]
      );
      const profilePicture = pic.rows[0].avatar;
      res.render("users/productInterface.ejs", {
        profilePicture,
        auctionProduct,
        mrpProduct,
        data: obj,
        userId: req.session.fullname,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const viewAuction = async (req, res) => {
  const data = await pool.query(
    "Select * from product INNER JOIN auction ON product.id=auction.productid"
  );
  console.log(data);
  res.render("product/viewAuction.ejs", { data: data.rows });
};

// const filterHighBidder = async (req, res) => {
//   const highbidder = await Auction.find({ productId: req.body.productId });
//   const data = highbidder.map((element) => {
//     return element.biddDetails[0];
//   });
//   const result = data.reduce((a, b) => {
//     return a > b.bidderAmount ? a : b;
//   }, 0);
//   const updateResult = {
//     productId: req.body.productId,
//     productName: highbidder[0].productName,
//     biddDetails: [],
//   };
//   updateResult.biddDetails.push(result);
//   const highBid = [];
//   highBid.push(updateResult);
//   res.render("product/viewAuction.ejs", { data: highBid });
// };

export {
  addProduct,
  viewProduct,
  deleteProduct,
  userProduct,
  addToCart,
  cart,
  addProductUI,
  order,
  placeOrder,
  vieworder,
  biddingData,
  viewAuction,
};
