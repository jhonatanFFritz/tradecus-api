import { pool } from "../../dbconection/db.js";

export const getOneTour = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT tour.*, imagenes.*
      FROM tour
      INNER JOIN imagenes
      ON tour.id_tour = imagenes.tour_id WHERE id_tour = ?`,
      [req.params.id]
    );
    if (!rows.length)
      return res.status(404).json({ msg: "Tour no encontrado" });

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
          tour_id: rows[i].tour_id,
        };
        tour.imagenes.push(imagen);
      }
      res.json(tour);

  } catch (error) {
    return res.status(500).json({ msg: "Error al obtener el tour" });
  }
};
