import { pool } from "../../dbconection/db.js";

export const addNewImg = async (req, res) => {
  //compeltar esto en el archivo de tour pero que los registros se guarden por medio de una transaccion sql
  //podemos guardar el destination ó el path (ruta d ela imagen) para servirlo al cliente
  const { filename, path } = req.file;
  console.log(req.file);
  const { tour_id_tour } = req.body;
  try {
    //rows es un arreglo de objetos que contiene los datos de la consulta sql
    const [rows] = await pool.query(
      "INSERT INTO imagenes(nombre_img, url_img, tour_id_tour) VALUES (?, ?, ?)",
      [filename, path, tour_id_tour]
    );

    res.send({
      id: rows.insertId,
      filename,
      path,
      tour_id_tour,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al guardar datos de la imagen" });
  }
};
