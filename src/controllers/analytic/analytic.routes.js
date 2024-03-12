import { pool } from "../../config/db.config.js";

const revenueWithInMonth = async (req, res) => {
  try {
    const data = await pool.query(
      "Select producttype,Sum(totalprice) as revenue from product Inner Join orders On product.id=orders.product_id where order_time>= Now() - Interval '1 Month' Group By producttype"
    );
    console.log(data);
  } catch (e) {
    res.status(411).json({ success: false, message: "Something went wrong" });
  }
};

export { revenueWithInMonth };
