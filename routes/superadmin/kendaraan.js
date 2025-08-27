const express = require('express');
const router = express.Router();
const { isAuthenticated, isSuperAdmin } = require('../../middleware/auth');
const Kendaraan = require('../../models/Model_Kendaraan');
const Tarif = require('../../models/Model_Tarif');

// READ - list kendaraan
router.get('/', isAuthenticated, isSuperAdmin, async (req, res) => {
  const data = await Kendaraan.getAll(); // pakai method dari model
  res.render('superadmin/kendaraan/index', { kendaraan: data });
});

// CREATE - form tambah
router.get('/create', isAuthenticated, isSuperAdmin, async (req, res) => {
  const tarif = await Tarif.getAll(); // pakai method dari model
  res.render('superadmin/kendaraan/create', { tarif });
});

// CREATE - simpan
router.post('/create', isAuthenticated, isSuperAdmin, async (req, res) => {
  const { id_tarif, opol, type, warna, tanggal_masuk, jam_masuk, status } = req.body;
  await Kendaraan.createKendaraan({
    id_user: req.session.user.id, 
    id_tarif,
    opol,
    type,
    warna,
    tanggal_masuk,
    jam_masuk,
    status: status || 'in'
  });
  res.redirect('/superadmin/kendaraan');
});

// UPDATE - form edit
router.get('/edit/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  const data = await Kendaraan.getById(req.params.id); // pakai method dari model
  const tarif = await Tarif.getAll();
  res.render('superadmin/kendaraan/edit', { kendaraan: data, tarif });
});

// UPDATE - simpan edit
router.post('/edit/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  const { id_tarif, opol, type, warna, status } = req.body;
  await Kendaraan.updateKendaraan(req.params.id, { id_tarif, opol, type, warna, status });
  res.redirect('/superadmin/kendaraan');
});

// DELETE
router.get('/delete/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  await Kendaraan.deleteKendaraan(req.params.id);
  res.redirect('/superadmin/kendaraan');
});

module.exports = router;
