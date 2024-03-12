import { Router } from "express";
import {
  addToCart,
  biddingData,
  cart,
  order,
  placeOrder,
  userProduct,
  viewAuction,
} from "../controllers/product/product.controller.js";
import sessionValidator from "../middlewares/sessionValidator.middleware.js";
const productRouter = Router();

productRouter.route("/site").get(sessionValidator, userProduct);
productRouter.route("/addtocart").post(sessionValidator, addToCart).get();
productRouter.route("/cart").get(sessionValidator, cart);
productRouter
  .route("/order")
  .get(sessionValidator, order)
  .post(sessionValidator, placeOrder);

productRouter.route("/view-auction").get(viewAuction);
productRouter.route("/bidding").post(biddingData);

export default productRouter;
