import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "admin",
  database: "ecomm_task",
  password: "password",
  port: 5432,
});

const dbConfig = async () => {
  try {
    await pool.connect();
    console.log("Database connected successfully");
  } catch (e) {
    return Promise.reject("Database failed to connected");
  }
};

export { dbConfig, pool };
