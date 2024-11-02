import { Pool } from "pg";
require("dotenv").config();

const pool = new Pool({
  user: process.env.LOCAL_DB_USER,
  host: process.env.LOCAL_DB_HOST,
  database: process.env.LOCAL_DB_NAME,
  password: process.env.LOCAL_DB_PASSWORD,
  port: 5432,
});

export default pool;