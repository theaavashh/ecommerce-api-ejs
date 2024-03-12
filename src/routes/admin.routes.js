import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addProduct,
  addProductUI,
  deleteProduct,
  editProduct,
  renderProduct,
  viewProduct,
  vieworder,
} from "../controllers/product/product.controller.js";
import { userUI } from "../controllers/users/renderUser.controller.js";

const adminRoutes = Router();

adminRoutes
  .route("/product")
  .get(addProductUI)
  .post(upload.single("avatar"), addProduct);
adminRoutes.route("/allproduct").get(viewProduct);
adminRoutes.route("/delete/:id").get(deleteProduct);

adminRoutes.route("/editproduct/:id").get(renderProduct);
adminRoutes.route("/edit-product").post(editProduct);
adminRoutes.route("/userinfo").get(userUI);
adminRoutes.route("/view-order").get(vieworder);

export default adminRoutes;
