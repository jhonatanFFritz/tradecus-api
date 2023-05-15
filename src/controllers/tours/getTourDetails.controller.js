import { pool } from "../../dbconection/db.js";

export const getTourDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(`
      SELECT *
      FROM tour
      LEFT JOIN detalle_tour ON tour.id_tour = detalle_tour.id_tour
      LEFT JOIN imagenes ON detalle_tour.id_tour = imagenes.tour_id
      WHERE tour.id_tour = ${id}
    `);
    if (!rows.length) {
      return res.status(404).json({ msg: "No hay registros para mostrar" });
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
          detalles: [], // agregamos el array de detalles
        };
        tours.push(currentTour);
      }
      if (row.id_img) {
        const imagen = {
          id_img: row.id_img,
          nombre_img: row.nombre_img,
          url_img: row.url_img,
          tour_id: row.tour_id,
        };
        currentTour.imagenes.push(imagen);
      }
      if (row.id_detalle_tour) { // agregamos esta condición para los detalles
        const detalle = {
          id_detalle_tour: row.id_detalle_tour,
          atractivo_tour: row.atractivo_tour,
          tipo_transporte: row.tipo_transporte,
          duracion_viaje: row.duracion_viaje,
          distancia_recorrido: row.distancia_recorrido,
          id_transporte: row.id_transporte,
          tour_id: row.tour_id,
        };
        currentTour.detalles.push(detalle);
      }
    }
    res.json(tours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};
