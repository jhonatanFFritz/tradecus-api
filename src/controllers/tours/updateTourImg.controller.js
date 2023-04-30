import { pool } from "../../dbconection/db.js";

export const updateTourImg = async (req, res) => {
  const { id_tour, id_img } = req.params;
  const { filename, path } = req.file;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] = await connection.query(
      "UPDATE imagenes SET nombre_img = ?, url_img = ? WHERE tour_id_tour = ? AND id_img = ?",
      [filename, path, id_tour, id_img]
    );

    await connection.commit();

    res.send({
      id_tour,
      id_img,
      filename,
      path,
    });
  } catch (error) {
    await connection.rollback();
    console.log(error);
    return res.status(500).json({ msg: "Error al actualizar la imagen del tour" });
  } finally {
    connection.release();
  }
};
