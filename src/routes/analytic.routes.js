import Router from "express";
import { revenueWithInMonth } from "../controllers/analytic/analytic.routes.js";
const analyticRoutes = Router();

analyticRoutes.route("/revenue/category").get(revenueWithInMonth);

export default analyticRoutes;
