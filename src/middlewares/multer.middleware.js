import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const Storestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/store");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
const uploadStore = multer({ storage: Storestorage });

export { upload, uploadStore };
