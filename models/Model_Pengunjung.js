const db = require('../config/database');

module.exports = {
    getAll: async () => {
        const [rows] = await db.promise().query("SELECT * FROM pengunjung");
        return rows;
    },

    getById: async (id_pengunjung) => {
        const [rows] = await db.promise().query("SELECT * FROM pengunjung WHERE id_pengunjung=?", [id_pengunjung]);
        return rows[0];
    },

    store: async (data) => {
        const [result] = await db.promise().query(
            "INSERT INTO pengunjung (wajah, pakaian, jenis_kelamin, id_kendaraan) VALUES (?, ?, ?, ?)",
            [data.wajah, data.pakaian, data.jenis_kelamin, data.id_kendaraan]
        );
        return result.insertId;
    },

    update: async (id_pengunjung, data) => {
        await db.promise().query(
            "UPDATE pengunjung SET wajah=?, pakaian=?, jenis_kelamin=?, id_kendaraan=? WHERE id_pengunjung=?",
            [data.wajah, data.pakaian, data.jenis_kelamin, data.id_kendaraan, id_pengunjung]
        );
    },

    delete: async (id_pengunjung) => {
        await db.promise().query("DELETE FROM pengunjung WHERE id_pengunjung=?", [id_pengunjung]);
    }
};
