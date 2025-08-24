const mysql = require('mysql2');

// buat koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',     // host database
  user: 'root',          // username MySQL
  password: '',          // password MySQL
  database: 'parkir'  // ganti sesuai nama database kamu
});

// cek koneksi
db.connect((err) => {
  if (err) {
    console.error('Koneksi database gagal: ', err);
  } else {
    console.log('Koneksi database berhasil!');
  }
});

module.exports = db;
