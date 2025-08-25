const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Kendaraan = require('./Model_Kendaraan');

const Pengunjung = sequelize.define('Pengunjung', {
  id_pengunjung: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  wajah: { type: DataTypes.STRING(255) },
  pakaian: { type: DataTypes.STRING(255) },
  jenis_kelamin: { type: DataTypes.ENUM('Laki-laki', 'Perempuan') },
  id_kendaraan: { type: DataTypes.INTEGER }
}, {
  tableName: 'pengunjung',
  timestamps: false
});

// Relasi
Pengunjung.belongsTo(Kendaraan, { foreignKey: 'id_kendaraan' });

module.exports = Pengunjung;
