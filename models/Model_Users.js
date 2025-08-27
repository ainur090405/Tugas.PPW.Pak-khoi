const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definisi tabel 'users'
const User = sequelize.define('User', {
  id_user: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nama: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING(100), 
    allowNull: false, 
    unique: true 
  },
  password: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  role: { 
    type: DataTypes.ENUM('superadmin', 'admin'), 
    defaultValue: 'admin' 
  }
}, {
  tableName: 'users',
  timestamps: false
});
// Ambil semua data user
User.getAll = async () => {
  return await User.findAll();
};

// Ambil user berdasarkan ID
User.getById = async (id) => {
  return await User.findByPk(id);
};

// Tambah user baru
User.createUser = async (data) => {
  return await User.create(data);
};

// Update user berdasarkan ID
User.updateUser = async (id, data) => {
  return await User.update(data, {
    where: { id_user: id }
  });
};

// Hapus user berdasarkan ID
User.deleteUser = async (id) => {
  return await User.destroy({
    where: { id_user: id }
  });
};

// ================================================

module.exports = User;
