import { pool } from "../../dbconection/db.js";

export const deleteTour = async (req, res) => {
  const { id } = req.params;

  try {
    // Primero, eliminamos las imágenes del tour
    await pool.query("DELETE FROM imagenes WHERE tour_id_tour = ?", [id]);

    // Luego, eliminamos el tour
    const [result] = await pool.query("DELETE FROM tour WHERE id_tour = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "El tour no existe" });
    }

    res.json({ msg: "Tour eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al eliminar el tour" });
  }
};