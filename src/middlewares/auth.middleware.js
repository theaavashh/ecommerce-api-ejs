import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { pool } from "../config/db.config.js";

const authMiddleWare = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const credentialUser = await pool.query(
        "Select * from useregistration where email=$1",
        [req.body.email]
      );
      if (credentialUser) {
        await bcrypt.compare(
          req.body.password,
          credentialUser.rows[0].password
        );
        next();
      } else {
        res.json({ success: false, msg: "Credential Doesnot Match" });
      }
    } else {
      res.json({ errors: errors.array() });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false, msg: "Bad Request for client end" });
  }
};

export default authMiddleWare;
