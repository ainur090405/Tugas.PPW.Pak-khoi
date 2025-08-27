const express = require('express');
const router = express.Router();
const { isAuthenticated, isSuperAdmin } = require('../../middleware/auth');
const Kendaraan = require('../../models/Model_Kendaraan');
const Tarif = require('../../models/Model_Tarif');

// READ - list kendaraan
router.get('/', isAuthenticated, isSuperAdmin, async (req, res) => {
  const data = await Kendaraan.findAll({ include: Tarif });
  res.render('superadmin/kendaraan/index', { kendaraan: data });
});

// CREATE - form tambah
router.get('/create', isAuthenticated, isSuperAdmin, async (req, res) => {
  const tarif = await Tarif.findAll();
  res.render('superadmin/kendaraan/create', { tarif });
});

// CREATE - simpan
router.post('/create', isAuthenticated, isSuperAdmin, async (req, res) => {
  const { id_tarif, opol, type, warna, tanggal_masuk, jam_masuk, status } = req.body;
  await Kendaraan.create({
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
  const data = await Kendaraan.findByPk(req.params.id);
  const tarif = await Tarif.findAll();
  res.render('superadmin/kendaraan/edit', { kendaraan: data, tarif });
});

// UPDATE - simpan edit
router.post('/edit/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  const { id_tarif, opol, type, warna, status } = req.body;
  await Kendaraan.update(
    { id_tarif, opol, type, warna, status },
    { where: { id_kendaraan: req.params.id } }
  );
  res.redirect('/superadmin/kendaraan');
});

// DELETE
router.get('/delete/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  await Kendaraan.destroy({ where: { id_kendaraan: req.params.id } });
  res.redirect('/superadmin/kendaraan');
});

module.exports = router;
