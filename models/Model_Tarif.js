const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tarif = sequelize.define('Tarif', {
  id_tarif: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.ENUM('mobil', 'motor') },
  harga: { type: DataTypes.DECIMAL(10,2) },
  satuan_waktu: { type: DataTypes.ENUM('20_menit','1_jam','per_hari','per_bulan') }
}, {
  tableName: 'tarif',
  timestamps: false
});

module.exports = Tarif;
