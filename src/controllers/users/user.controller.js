import User from "../../models/user.models.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

const addUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
    } else {
      const userDetails = req.body;
      const data = await User.create({
        ...userDetails,
        avatar: req.file.filename,
      });
      data
        ? res.render("auth/register.ejs", { msg: "User Created" })
        : res.status(400).json({
            success: true,
            message: "User account failed to created",
          });
    }
  } catch (e) {
    res.json({ success: false, message: "Bad request from user end" });
  }
};

const authUser = async (req, res) => {
  const data = await User.findOne({ email: req.body.email });
  req.session.contact = data.contact;
  req.session.fullname = data.fullname;
  req.session.email = data.email;
  try {
    if (data.role == "User") res.redirect("site");
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
