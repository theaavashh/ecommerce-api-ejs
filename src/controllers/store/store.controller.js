import { pool } from "../../config/db.config.js";
import Store from "../../models/store.models.js";

const addStore = async (req, res) => {
  try {
    req.body.logo = req.file.filename;
    const { storeName, logo, storeType, latitude, longitude } = req.body;
    const data = await pool.query(
      "Insert into store(storeName, storeLogo, storeType, latitude, longitude) Values($1,$2,$3,$4,$5)",
      [storeName, logo, storeType, latitude, longitude]
    );
    data
      ? res.render("store/addStore.ejs", {
          msg: "Store Created Successfully !",
        })
      : "";
  } catch (e) {
    console.log(e);
    res.json({ success: false, msg: "Bad Request from user end" });
  }
};

const renderAddStore = async (req, res) => {
  res.render("store/addStore.ejs");
};

const renderViewStore = async (req, res) => {
  const data = await pool.query("Select * from store");
  res.render("store/viewStore.ejs", { data: data.rows });
};

export { addStore, renderAddStore, renderViewStore };
