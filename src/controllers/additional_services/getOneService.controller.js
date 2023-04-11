import {pool} from '../../dbconection/db.js';
//El siguiente código obtine un servicio adicional por id
export const getAdditionalService = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM servicio_adicional WHERE id_serv_adicional = ?", [req.params.id]);
        if (!rows.length) return res.status(404).json({msg: "Servicio adicional no encontrado"});
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({msg: "Error al obtener el servicio adicional"});
    }
}