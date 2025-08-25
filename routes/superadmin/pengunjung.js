const express = require('express');
const router = express.Router();
const { isAuthenticated, isSuperAdmin } = require('../../middleware/auth');
const Pengunjung = require('../../models/Model_Pengunjung');
const Kendaraan = require('../../models/Model_Kendaraan');

// Semua CRUD sama seperti admin, tapi pakai isSuperAdmin
router.get('/', isAuthenticated, isSuperAdmin, async (req, res) => {
  const data = await Pengunjung.findAll({ include: Kendaraan });
  res.render('superadmin/pengunjung/index', { pengunjung: data });
});

module.exports = router;
// dst. sama persis dengan admin
