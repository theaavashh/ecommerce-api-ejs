import { Router } from "express";
const userRoutes = Router();
import { upload } from "../middlewares/multer.middleware.js";
import {
  addUser,
  authUser,
  editDetails,
  updateDetails,
} from "../controllers/users/user.controller.js";
import { login, register } from "../controllers/users/renderUser.controller.js";
import authMiddleWare from "../middlewares/auth.middleware.js";
import {
  loginValidation,
  registerValidate,
} from "../middlewares/validator.middleware.js";

userRoutes
  .route("/user")
  .post(upload.single("avatar"), registerValidate, addUser)
  .get(register);

userRoutes
  .route("/login")
  .post(loginValidation, authMiddleWare, authUser)
  .get(login);

userRoutes.route("/editprofile").get(editDetails).post(updateDetails);

export default userRoutes;
