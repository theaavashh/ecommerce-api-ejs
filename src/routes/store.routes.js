import { Router } from "express";
import {
  addStore,
  renderAddStore,
  renderViewStore,
} from "../controllers/store/store.controller.js";
import { uploadStore } from "../middlewares/multer.middleware.js";
const storeRoutes = Router();

storeRoutes
  .route("/store")
  .post(uploadStore.single("logo"), addStore)
  .get(renderAddStore);

storeRoutes.route("/view-store").get(renderViewStore);

export default storeRoutes;
