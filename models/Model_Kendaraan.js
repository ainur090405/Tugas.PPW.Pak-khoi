const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./Model_Users');
const Tarif = require('./Model_Tarif');

const Kendaraan = sequelize.define('Kendaraan', {
  id_kendaraan: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_user: { type: DataTypes.INTEGER },
  id_tarif: { type: DataTypes.INTEGER },
  opol: { type: DataTypes.STRING(20) },
  foto: { type: DataTypes.STRING(255) },
  type: { type: DataTypes.ENUM('mobil', 'motor') },
  warna: { type: DataTypes.STRING(50) },
  tanggal_masuk: { type: DataTypes.DATE },
  tanggal_keluar: { type: DataTypes.DATE },
  jam_masuk: { type: DataTypes.TIME },
  jam_keluar: { type: DataTypes.TIME },
  biaya: { type: DataTypes.DECIMAL(10,2) },
  status: { type: DataTypes.ENUM('in', 'out') }
}, {
  tableName: 'kendaraan',
  timestamps: false
});

// Relasi
Kendaraan.belongsTo(User, { foreignKey: 'id_user' });
Kendaraan.belongsTo(Tarif, { foreignKey: 'id_tarif' });

module.exports = Kendaraan;
