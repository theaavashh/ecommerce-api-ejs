import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

const authMiddleWare = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const credentialUser = await User.findOne({
        email: req.body.email,
      });
      if (credentialUser) {
        const decryptedPassword = await bcrypt.compare(
          req.body.password,
          credentialUser.password
        );
        next();
      } else {
        res.json({ success: false, msg: "Credential Doesnot Match" });
      }
    } else {
      res.json({ errors: errors.array() });
    }
  } catch (e) {
    res.json({ success: false, msg: "Bad Request for client end" });
  }
};

export default authMiddleWare;
