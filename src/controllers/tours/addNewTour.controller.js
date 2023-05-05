import { pool } from "../../dbconection/db.js";

export const addNewTour = async (req, res) => {
  const {
    nombre_tour,
    precio_tour,
    precio_promo_tour,
    duracion_tour,
    descripcion_tour,
    estado_tour,
    atractivo_tour,
    tipo_transporte,
    duracion_viaje,
    distancia_recorrido,
    medio_transporte_id_transporte,
  } = req.body;
  const images = req.files;

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
      "INSERT INTO detalle_tour(atractivo_tour, tipo_transporte, duracion_viaje, distancia_recorrido, tour_id_tour, medio_transporte_id_transporte) VALUES (?, ?, ?, ?, ?, ?)",
      [
        atractivo_tour,
        tipo_transporte,
        duracion_viaje,
        distancia_recorrido,
        tour_id_tour,
        medio_transporte_id_transporte,
      ]
    );

    for (let i = 0; i < images.length; i++) {
      const { filename, path } = images[i];

      await connection.query(
        "INSERT INTO imagenes(nombre_img, url_img, tour_id_tour) VALUES (?, ?, ?)",
        [filename, path, tour_id_tour]
      );
    }

    await connection.commit();

    res.send({
      id: rows.insertId,
      nombre_tour,
      precio_tour,
      precio_promo_tour,
      duracion_tour,
      descripcion_tour,
      estado_tour,
      atractivo_tour,
      tipo_transporte,
      duracion_viaje,
      distancia_recorrido,
      medio_transporte_id_transporte,
      images,
      tour_id_tour,
    });
  } catch (error) {
    await connection.rollback();
    console.log(error);
    return res.status(500).json({ msg: "Error al registrar el nuevo tour" });
  } finally {
    connection.release();
  }
};
