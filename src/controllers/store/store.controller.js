import Store from "../../models/store.models.js";

const addStore = async (req, res) => {
  try {
    const data = await Store.create({
      ...req.body,
      logo: req.file.filename,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(req.body.longitude),
          parseFloat(req.body.latitude),
        ],
      },
      userId: req.session.email,
    });
    data
      ? res.render("store/addStore.ejs", {
          msg: "Store Created Successfully !",
        })
      : "";
  } catch (e) {
    res.json({ success: false, msg: "Bad Request from user end" });
  }
};

const renderAddStore = async (req, res) => {
  res.render("store/addStore.ejs");
};

const renderViewStore = async (req, res) => {
  const data = await Store.find();
  res.render("store/viewStore.ejs", { data });
};

export { addStore, renderAddStore, renderViewStore };
