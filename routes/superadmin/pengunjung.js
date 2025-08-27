const express = require('express');
const router = express.Router();
const { isAuthenticated, isSuperAdmin } = require('../../middleware/auth');
const Pengunjung = require('../../models/Model_Pengunjung');
const Kendaraan = require('../../models/Model_Kendaraan');

// READ - list pengunjung
router.get('/', isAuthenticated, isSuperAdmin, async (req, res) => {
  const data = await Pengunjung.findAll({ include: Kendaraan });
  res.render('superadmin/pengunjung/index', { pengunjung: data });
});

// CREATE - form tambah
router.get('/create', isAuthenticated, isSuperAdmin, async (req, res) => {
  const kendaraan = await Kendaraan.findAll(); // biar bisa pilih kendaraan
  res.render('superadmin/pengunjung/create', { kendaraan });
});

// CREATE - simpan data
router.post('/create', isAuthenticated, isSuperAdmin, async (req, res) => {
  const { wajah, pakaian, jenis_kelamin, id_kendaraan } = req.body;
  await Pengunjung.create({ wajah, pakaian, jenis_kelamin, id_kendaraan });
  res.redirect('/superadmin/pengunjung');
});

// UPDATE - form edit
router.get('/edit/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  const data = await Pengunjung.findByPk(req.params.id);
  const kendaraan = await Kendaraan.findAll();
  res.render('superadmin/pengunjung/edit', { pengunjung: data, kendaraan });
});

// UPDATE - simpan edit
router.post('/edit/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  const { wajah, pakaian, jenis_kelamin, id_kendaraan } = req.body;
  await Pengunjung.update(
    { wajah, pakaian, jenis_kelamin, id_kendaraan },
    { where: { id_pengunjung: req.params.id } }
  );
  res.redirect('/superadmin/pengunjung');
});

// DELETE
router.get('/delete/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  await Pengunjung.destroy({ where: { id_pengunjung: req.params.id } });
  res.redirect('/superadmin/pengunjung');
});

module.exports = router;
