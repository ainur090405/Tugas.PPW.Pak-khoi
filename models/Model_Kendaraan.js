const db = require('../config/database');

module.exports = {
    getAll: async () => {
        const [rows] = await db.promise().query(`
            SELECT k.*, u.nama AS nama_user, t.type AS tarif_type, t.harga, t.satuan_waktu
            FROM kendaraan k
            LEFT JOIN users u ON k.id_user = u.id_user
            LEFT JOIN tarif t ON k.id_tarif = t.id_tarif
        `);
        return rows;
    },

    getById: async (id_kendaraan) => {
        const [rows] = await db.promise().query("SELECT * FROM kendaraan WHERE id_kendaraan=?", [id_kendaraan]);
        return rows[0];
    },

    store: async (data) => {
        const [result] = await db.promise().query(
            `INSERT INTO kendaraan 
            (id_user, id_tarif, opol, foto, type, warna, tanggal_masuk, tanggal_keluar, jam_masuk, jam_keluar, biaya, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [data.id_user, data.id_tarif, data.opol, data.foto, data.type, data.warna,
             data.tanggal_masuk, data.tanggal_keluar, data.jam_masuk, data.jam_keluar, data.biaya, data.status]
        );
        return result.insertId;
    },

    update: async (id_kendaraan, data) => {
        await db.promise().query(
            `UPDATE kendaraan SET id_user=?, id_tarif=?, opol=?, foto=?, type=?, warna=?, 
             tanggal_masuk=?, tanggal_keluar=?, jam_masuk=?, jam_keluar=?, biaya=?, status=? 
             WHERE id_kendaraan=?`,
            [data.id_user, data.id_tarif, data.opol, data.foto, data.type, data.warna,
             data.tanggal_masuk, data.tanggal_keluar, data.jam_masuk, data.jam_keluar,
             data.biaya, data.status, id_kendaraan]
        );
    },

    delete: async (id_kendaraan) => {
        await db.promise().query("DELETE FROM kendaraan WHERE id_kendaraan=?", [id_kendaraan]);
    }
};
