import { pool } from "../../dbconection/db.js";

//El siguiente código crea un metodo de pago
export const addNewPaymentMethod = async (req, res) => {
  const { nombre_pago, descripcion_pago } = req.body;
  try {
    //rows es un arreglo de objetos que contiene los datos de la consulta sql
    const [rows] = await pool.query(
      "INSERT INTO metodo_pago(nombre_pago, descripcion_pago) VALUES (?, ?)",
      [nombre_pago, descripcion_pago]
    );
    res.send({
      id: rows.insertId,
      nombre_pago,
      descripcion_pago,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al crear el metodo de pago" });
  }
};
