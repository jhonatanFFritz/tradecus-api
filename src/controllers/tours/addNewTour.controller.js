import { pool } from "../../dbconection/db.js";

export const addNewTour = async (req, res) => {
  const {
    nombre_tour,
    precio_tour,
    precio_promo_tour,
    duracion_tour,
    descripcion_tour,
    estado_tour,
  } = req.body;
  const { filename, path } = req.file;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] = await connection.query(
      "INSERT INTO tour(nombre_tour, precio_tour, precio_promo_tour, duracion_tour,descripcion_tour,  estado_tour) VALUES (?, ?, ?, ?, ?, ?)",
      [
        nombre_tour,
        precio_tour,
        precio_promo_tour,
        duracion_tour,
        descripcion_tour,
        estado_tour,
      ]
    );
    const tour_id_tour = rows.insertId;

    await connection.query(
      "INSERT INTO imagenes(nombre_img, url_img, tour_id_tour) VALUES (?, ?, ?)",
      [filename, path, tour_id_tour]
    );

    await connection.commit();

    res.send({
      id: rows.insertId,
      nombre_tour,
      precio_tour,
      precio_promo_tour,
      duracion_tour,
      descripcion_tour,
      estado_tour,
      filename,
      path,
      tour_id_tour
    });
  } catch (error) {
    await connection.rollback();
    console.log(error);
    return res.status(500).json({ msg: "Error al registrar el nuevo tour" });
  } finally {
    connection.release();
  }
};
