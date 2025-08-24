const db = require('../config/database');

module.exports = {
    getAll: async () => {
        const [rows] = await db.promise().query("SELECT * FROM tarif");
        return rows;
    },

    getById: async (id_tarif) => {
        const [rows] = await db.promise().query("SELECT * FROM tarif WHERE id_tarif=?", [id_tarif]);
        return rows[0];
    },

    store: async (data) => {
        const [result] = await db.promise().query(
            "INSERT INTO tarif (type, harga, satuan_waktu) VALUES (?, ?, ?)",
            [data.type, data.harga, data.satuan_waktu]
        );
        return result.insertId;
    },

    update: async (id_tarif, data) => {
        await db.promise().query(
            "UPDATE tarif SET type=?, harga=?, satuan_waktu=? WHERE id_tarif=?",
            [data.type, data.harga, data.satuan_waktu, id_tarif]
        );
    },

    delete: async (id_tarif) => {
        await db.promise().query("DELETE FROM tarif WHERE id_tarif=?", [id_tarif]);
    }
};
