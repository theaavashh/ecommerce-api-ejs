import "dotenv/config";
import app from "./app.js";
import { dbConfig } from "./config/db.config.js";
import { PORT } from "./constant.js";

dbConfig()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT} `);
    });
  })
  .catch((e) => console.log(e));
