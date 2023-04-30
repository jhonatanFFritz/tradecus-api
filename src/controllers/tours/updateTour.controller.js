import { pool } from "../../dbconection/db.js";
export const updateTour = async (req, res) => {
  const { id } = req.params;
  const {
    nombre_tour,
    precio_tour,
    precio_promo_tour,
    duracion_tour,
    descripcion_tour,
    estado_tour,
  } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE tour SET 
         nombre_tour = IFNULL(?, nombre_tour), 
         precio_tour = IFNULL(?, precio_tour), 
         precio_promo_tour = IFNULL(?, precio_promo_tour),
         duracion_tour = IFNULL(?, duracion_tour),
         descripcion_tour = IFNULL(?, descripcion_tour),
         estado_tour = IFNULL(?, estado_tour)
         WHERE id_tour = ?`,
      [
        nombre_tour,
        precio_tour,
        precio_promo_tour,
        duracion_tour,
        descripcion_tour,
        estado_tour,
        id,
      ]
    );

    if (!result.affectedRows) {
      return res
        .status(404)
        .json({ msg: "No se encontró el tour especificado" });
    }

    const [rows] = await pool.query(
      `SELECT tour.*, imagenes.*
       FROM tour
       INNER JOIN imagenes
       ON tour.id_tour = imagenes.tour_id_tour
       WHERE tour.id_tour = ?`,
      [id]
    );

    if (!rows.length) {
      return res
        .status(404)
        .json({ msg: "No se encontró el tour especificado" });
    }

    const tour = {
      id_tour: rows[0].id_tour,
      nombre_tour: rows[0].nombre_tour,
      precio_tour: rows[0].precio_tour,
      precio_promo_tour: rows[0].precio_promo_tour,
      duracion_tour: rows[0].duracion_tour,
      descripcion_tour: rows[0].descripcion_tour,
      estado_tour: rows[0].estado_tour,
      imagenes: [],
    };

    for (let i = 0; i < rows.length; i++) {
      const imagen = {
        id_img: rows[i].id_img,
        nombre_img: rows[i].nombre_img,
        url_img: rows[i].url_img,
        tour_id_tour: rows[i].tour_id_tour,
      };
      tour.imagenes.push(imagen);
    }

    res.json(tour);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al actualizar el tour" });
  }
};
