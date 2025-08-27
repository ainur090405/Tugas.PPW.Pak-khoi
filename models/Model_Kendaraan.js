const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./Model_Users');
const Tarif = require('./Model_Tarif');

// Definisi tabel kendaraan
const Kendaraan = sequelize.define('Kendaraan', {
  id_kendaraan: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  id_user: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_tarif: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  opol: { 
    type: DataTypes.STRING(20),
    allowNull: false
  },
  foto: { 
    type: DataTypes.STRING(255),
    allowNull: true
  },
  type: { 
    type: DataTypes.ENUM('mobil', 'motor'),
    allowNull: false
  },
  warna: { 
    type: DataTypes.STRING(50),
    allowNull: true
  },
  tanggal_masuk: { 
    type: DataTypes.DATE,
    allowNull: false
  },
  tanggal_keluar: { 
    type: DataTypes.DATE,
    allowNull: true
  },
  jam_masuk: { 
    type: DataTypes.TIME,
    allowNull: false
  },
  jam_keluar: { 
    type: DataTypes.TIME,
    allowNull: true
  },
  biaya: { 
    type: DataTypes.DECIMAL(10,2),
    allowNull: true
  },
  status: { 
    type: DataTypes.ENUM('in', 'out'),
    defaultValue: 'in'
  }
}, {
  tableName: 'kendaraan',
  timestamps: false
});

// Relasi
Kendaraan.belongsTo(User, { foreignKey: 'id_user' });
Kendaraan.belongsTo(Tarif, { foreignKey: 'id_tarif' });


// ==================== METHOD CRUD ====================

// ambil semua kendaraan (include User & Tarif)
Kendaraan.getAll = async () => {
  try {
    return await Kendaraan.findAll({ include: [User, Tarif] });
  } catch (err) {
    throw err;
  }
};

// ambil kendaraan berdasarkan id
Kendaraan.getById = async (id) => {
  try {
    return await Kendaraan.findByPk(id, { include: [User, Tarif] });
  } catch (err) {
    throw err;
  }
};

// tambah kendaraan baru
Kendaraan.createKendaraan = async (data) => {
  try {
    return await Kendaraan.create(data);
  } catch (err) {
    throw err;
  }
};

// update kendaraan berdasarkan id
Kendaraan.updateKendaraan = async (id, data) => {
  try {
    return await Kendaraan.update(data, {
      where: { id_kendaraan: id }
    });
  } catch (err) {
    throw err;
  }
};

// hapus kendaraan berdasarkan id
Kendaraan.deleteKendaraan = async (id) => {
  try {
    return await Kendaraan.destroy({
      where: { id_kendaraan: id }
    });
  } catch (err) {
    throw err;
  }
};

// =====================================================

module.exports = Kendaraan;
