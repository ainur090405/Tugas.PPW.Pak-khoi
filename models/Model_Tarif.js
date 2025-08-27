const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definisi tabel tarif
const Tarif = sequelize.define('Tarif', {
  id_tarif: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  type: { 
    type: DataTypes.ENUM('mobil', 'motor'),
    allowNull: false
  },
  harga: { 
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  satuan_waktu: { 
    type: DataTypes.ENUM('20_menit','1_jam','per_hari','per_bulan'),
    allowNull: false
  }
}, {
  tableName: 'tarif',
  timestamps: false
});


// ==================== METHOD CRUD ====================

// ambil semua data tarif
Tarif.getAll = async () => {
  try {
    return await Tarif.findAll();
  } catch (err) {
    throw err;
  }
};

// ambil tarif berdasarkan id
Tarif.getById = async (id) => {
  try {
    return await Tarif.findByPk(id);
  } catch (err) {
    throw err;
  }
};

// tambah data tarif baru
Tarif.createTarif = async (data) => {
  try {
    return await Tarif.create(data);
  } catch (err) {
    throw err;
  }
};

// update data tarif berdasarkan id
Tarif.updateTarif = async (id, data) => {
  try {
    return await Tarif.update(data, {
      where: { id_tarif: id }
    });
  } catch (err) {
    throw err;
  }
};

// hapus data tarif berdasarkan id
Tarif.deleteTarif = async (id) => {
  try {
    return await Tarif.destroy({
      where: { id_tarif: id }
    });
  } catch (err) {
    throw err;
  }
};

module.exports = Tarif;
