const db = require('../config/database');
const bcrypt = require('bcrypt');

module.exports = {
    // ambil semua user
    getAll: async () => {
        const [rows] = await db.promise().query("SELECT * FROM users");
        return rows;
    },

    // ambil user by id
    getById: async (id_user) => {
        const [rows] = await db.promise().query("SELECT * FROM users WHERE id_user = ?", [id_user]);
        return rows[0];
    },

    // register user baru (hash password)
    store: async (data) => {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const [result] = await db.promise().query(
            "INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)",
            [data.nama, data.email, hashedPassword, data.role || 'admin']
        );
        return result.insertId;
    },

    // login user (cek email + password)
    login: async (email, password) => {
        const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) return null;

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        return match ? user : null;
    },

    // update user
    update: async (id_user, data) => {
        let sql = "UPDATE users SET nama=?, email=?, role=? WHERE id_user=?";
        await db.promise().query(sql, [data.nama, data.email, data.role, id_user]);
    },

    // delete user
    delete: async (id_user) => {
        await db.promise().query("DELETE FROM users WHERE id_user=?", [id_user]);
    },

    // ganti password user (hash baru)
    changePassword: async (id_user, newPassword) => {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.promise().query("UPDATE users SET password=? WHERE id_user=?", [hashedPassword, id_user]);
    }
};
