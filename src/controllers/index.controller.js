import { pool } from "../dbconection/db.js";

export const ping = async (req, res) => {
  const result = await pool.query('SELECT "PONG" AS solution');
  res.json(result[0]);
};
