import { pool } from "../../config/db.config.js";
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
  const userdetails = await pool.query("Select * from useregistration");
  res.render("./users/user.ejs", { details: userdetails.rows });
};

export { register, login, dashboard, product, userUI };
