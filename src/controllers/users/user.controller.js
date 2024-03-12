import User from "../../models/user.models.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { pool } from "../../config/db.config.js";

const addUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
    } else {
      req.body.avatar = req.file?.filename;
      const { fullname, email, contact, password, avatar } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword);
      await pool.query(
        "Insert into useregistration (fullname,email,contact,password,avatar) Values($1,$2,$3,$4,$5)",
        [fullname, email, contact, hashPassword, avatar]
      );
      res.render("auth/register.ejs", { msg: "User Created" });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Bad request from user end" });
  }
};

const authUser = async (req, res) => {
  const data = await pool.query(
    "Select * from useregistration where email=$1",
    [req.body.email]
  );
  const userDetails = data.rows[0];
  req.session.contact = userDetails.contact;
  req.session.fullname = userDetails.fullname;
  req.session.email = userDetails.email;
  try {
    if (userDetails.roles == "user") res.redirect("site");
    else res.render("product/viewProduct.ejs");
  } catch (e) {
    res.json({ success: false, message: "Bad request from user end" });
  }
};

const editDetails = async (req, res) => {
  try {
    const data = await User.findOne({ fullname: req.session.fullname });
    res.render("users/editProfile.ejs", { data });
  } catch (e) {
    res.json({ success: false });
  }
};

const updateDetails = async (req, res) => {
  try {
    const data = await User.findOneAndUpdate(
      { fullname: req.session.fullname },
      { ...req.body }
    );
    data
      ? res.render("auth/login.ejs")
      : res.json({ success: false, msg: "Failed to update details" });
  } catch (e) {
    res.json({ success: false });
  }
};
export { addUser, authUser, editDetails, updateDetails };
