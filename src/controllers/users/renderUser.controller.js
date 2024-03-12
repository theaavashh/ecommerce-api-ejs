import User from "../../models/user.models.js";

const register = async (req, res) => {
  res.render("./auth/register.ejs");
};

const login = async (req, res) => {
  res.render("./auth/login.ejs");
};

const dashboard = async (req, res) => {
  res.render("./product/dashboard.ejs");
};

const product = async (req, res) => {
  res.render("./product/addProduct.ejs");
};

const userUI = async (req, res) => {
  const userdetails = await User.find();
  res.render("./users/user.ejs", { details: userdetails });
};

export { register, login, dashboard, product, userUI };
