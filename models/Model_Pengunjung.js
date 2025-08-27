const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Kendaraan = require('./Model_Kendaraan');

// Definisi tabel pengunjung
const Pengunjung = sequelize.define('Pengunjung', {
  id_pengunjung: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  wajah: { 
    type: DataTypes.STRING(255),
    allowNull: true
  },
  pakaian: { 
    type: DataTypes.STRING(255),
    allowNull: true
  },
  jenis_kelamin: { 
    type: DataTypes.ENUM('Laki-laki', 'Perempuan'),
    allowNull: false
  },
  id_kendaraan: { 
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'pengunjung',
  timestamps: false
});

// Relasi
Pengunjung.belongsTo(Kendaraan, { foreignKey: 'id_kendaraan' });


// ==================== METHOD CRUD ====================

// ambil semua pengunjung (include data kendaraan)
Pengunjung.getAll = async () => {
  try {
    return await Pengunjung.findAll({ include: Kendaraan });
  } catch (err) {
    throw err;
  }
};

// ambil pengunjung berdasarkan id
Pengunjung.getById = async (id) => {
  try {
    return await Pengunjung.findByPk(id, { include: Kendaraan });
  } catch (err) {
    throw err;
  }
};

// tambah pengunjung baru
Pengunjung.createPengunjung = async (data) => {
  try {
    return await Pengunjung.create(data);
  } catch (err) {
    throw err;
  }
};

// update pengunjung berdasarkan id
Pengunjung.updatePengunjung = async (id, data) => {
  try {
    return await Pengunjung.update(data, {
      where: { id_pengunjung: id }
    });
  } catch (err) {
    throw err;
  }
};

// hapus pengunjung berdasarkan id
Pengunjung.deletePengunjung = async (id) => {
  try {
    return await Pengunjung.destroy({
      where: { id_pengunjung: id }
    });
  } catch (err) {
    throw err;
  }
};

// =====================================================

module.exports = Pengunjung;
