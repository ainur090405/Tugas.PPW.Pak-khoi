const express = require('express');
const router = express.Router();
const { isAuthenticated, isSuperAdmin } = require('../../middleware/auth');
const Pengunjung = require('../../models/Model_Pengunjung');
const Kendaraan = require('../../models/Model_Kendaraan');

// READ - list pengunjung
router.get('/', isAuthenticated, isSuperAdmin, async (req, res) => {
  const data = await Pengunjung.getAll(); // pakai method dari model
  res.render('superadmin/pengunjung/index', { pengunjung: data });
});

// CREATE - form tambah
router.get('/create', isAuthenticated, isSuperAdmin, async (req, res) => {
  const kendaraan = await Kendaraan.getAll(); // pakai method dari model
  res.render('superadmin/pengunjung/create', { kendaraan });
});

// CREATE - simpan data
router.post('/create', isAuthenticated, isSuperAdmin, async (req, res) => {
  const { wajah, pakaian, jenis_kelamin, id_kendaraan } = req.body;
  await Pengunjung.createPengunjung({ wajah, pakaian, jenis_kelamin, id_kendaraan });
  res.redirect('/superadmin/pengunjung');
});

// UPDATE - form edit
router.get('/edit/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  const data = await Pengunjung.getById(req.params.id); // pakai method dari model
  const kendaraan = await Kendaraan.getAll();
  res.render('superadmin/pengunjung/edit', { pengunjung: data, kendaraan });
});

// UPDATE - simpan edit
router.post('/edit/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  const { wajah, pakaian, jenis_kelamin, id_kendaraan } = req.body;
  await Pengunjung.updatePengunjung(req.params.id, { wajah, pakaian, jenis_kelamin, id_kendaraan });
  res.redirect('/superadmin/pengunjung');
});

// DELETE
router.get('/delete/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  await Pengunjung.deletePengunjung(req.params.id);
  res.redirect('/superadmin/pengunjung');
});

module.exports = router;
