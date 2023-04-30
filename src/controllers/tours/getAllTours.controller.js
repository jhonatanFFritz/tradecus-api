import { pool } from "../../dbconection/db.js";

export const getAllTours = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT tour.*, imagenes.*
      FROM tour
      INNER JOIN imagenes ON tour.id_tour = imagenes.tour_id_tour
      ORDER BY tour.id_tour ASC, imagenes.id_img ASC
    `);
    
    if (!rows.length) {
      return res.status(404).json({ msg: "No se pueden listar los tours" });
    }

    const tours = [];
    let currentTour = null;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      if (row.id_tour !== currentTour?.id_tour) {
        currentTour = {
          id_tour: row.id_tour,
          nombre_tour: row.nombre_tour,
          precio_tour: row.precio_tour,
          precio_promo_tour: row.precio_promo_tour,
          duracion_tour: row.duracion_tour,
          descripcion_tour: row.descripcion_tour,
          estado_tour: row.estado_tour,
          imagenes: [],
        };
        tours.push(currentTour);
      }

      if (row.id_img) {
        const imagen = {
          id_img: row.id_img,
          nombre_img: row.nombre_img,
          url_img: row.url_img,
          tour_id_tour: row.tour_id_tour,
        };
        currentTour.imagenes.push(imagen);
      }
    }
    res.json(tours);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al obtener los tours" });
  }
};