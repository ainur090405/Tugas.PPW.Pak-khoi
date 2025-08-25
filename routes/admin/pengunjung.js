const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../../middleware/auth');
const Pengunjung = require('../../models/Model_Pengunjung');
const Kendaraan = require('../../models/Model_Kendaraan');

// READ - list pengunjung
router.get('/', isAuthenticated, isAdmin, async (req, res) => {
  const data = await Pengunjung.findAll({ include: Kendaraan });
  res.render('admin/pengunjung/index', { pengunjung: data });
});

// CREATE - form tambah
router.get('/create', isAuthenticated, isAdmin, (req, res) => {
  res.render('admin/pengunjung/create');
});

// CREATE - simpan data
router.post('/create', isAuthenticated, isAdmin, async (req, res) => {
  const { wajah, pakaian, jenis_kelamin, id_kendaraan } = req.body;
  await Pengunjung.create({ wajah, pakaian, jenis_kelamin, id_kendaraan });
  res.redirect('/admin/pengunjung');
});

// UPDATE - form edit
router.get('/edit/:id', isAuthenticated, isAdmin, async (req, res) => {
  const data = await Pengunjung.findByPk(req.params.id);
  res.render('admin/pengunjung/edit', { pengunjung: data });
});

// UPDATE - simpan edit
router.post('/edit/:id', isAuthenticated, isAdmin, async (req, res) => {
  const { wajah, pakaian, jenis_kelamin, id_kendaraan } = req.body;
  await Pengunjung.update(
    { wajah, pakaian, jenis_kelamin, id_kendaraan },
    { where: { id_pengunjung: req.params.id } }
  );
  res.redirect('/admin/pengunjung');
});

// DELETE
router.get('/delete/:id', isAuthenticated, isAdmin, async (req, res) => {
  await Pengunjung.destroy({ where: { id_pengunjung: req.params.id } });
  res.redirect('/admin/pengunjung');
});

module.exports = router;
