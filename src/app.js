import express from "express";
import session from "express-session";
import userRoutes from "./routes/users.routes.js";
const app = express();
import ejs from "ejs";
import productRouter from "./routes/product.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import storeRoutes from "./routes/store.routes.js";
import analyticRoutes from "./routes/analytic.routes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "Your_Secret_Key", resave: true, saveUninitialized: true })
);

app.use(express.static("./public"));
app.set("view engine", ejs);

app.use("/api/v1", userRoutes);
app.use("/api/v1", adminRoutes);
app.use("/api/v1", productRouter);
app.use("/api/v1", storeRoutes);
app.use("/api/v1", analyticRoutes);

export default app;
