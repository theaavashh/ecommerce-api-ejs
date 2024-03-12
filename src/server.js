import "dotenv/config";
import app from "./app.js";
import dbConfig from "./config/db.config.js";
import { PORT } from "./constant.js";

dbConfig(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
  });
});
