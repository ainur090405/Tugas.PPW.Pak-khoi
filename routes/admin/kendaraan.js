const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../../middleware/auth');
const Kendaraan = require('../../models/Model_Kendaraan');
const Tarif = require('../../models/Model_Tarif');

// READ - list kendaraan
router.get('/', isAuthenticated, isAdmin, async (req, res) => {
  const data = await Kendaraan.findAll({ include: Tarif });
  res.render('admin/kendaraan/index', { kendaraan: data });
});

// CREATE - form tambah
router.get('/create', isAuthenticated, isAdmin, async (req, res) => {
  const tarif = await Tarif.findAll();
  res.render('admin/kendaraan/create', { tarif });
});

// CREATE - simpan
router.post('/create', isAuthenticated, isAdmin, async (req, res) => {
  const { id_tarif, opol, type, warna, tanggal_masuk, jam_masuk } = req.body;
  await Kendaraan.create({
    id_user: req.session.user.id, // kendaraan dicatat oleh admin yang login
    id_tarif,
    opol,
    type,
    warna,
    tanggal_masuk,
    jam_masuk,
    status: 'in'
  });
  res.redirect('/admin/kendaraan');
});

// UPDATE - form edit
router.get('/edit/:id', isAuthenticated, isAdmin, async (req, res) => {
  const data = await Kendaraan.findByPk(req.params.id);
  const tarif = await Tarif.findAll();
  res.render('admin/kendaraan/edit', { kendaraan: data, tarif });
});

// UPDATE - simpan edit
router.post('/edit/:id', isAuthenticated, isAdmin, async (req, res) => {
  const { id_tarif, opol, type, warna, status } = req.body;
  await Kendaraan.update(
    { id_tarif, opol, type, warna, status },
    { where: { id_kendaraan: req.params.id } }
  );
  res.redirect('/admin/kendaraan');
});

// DELETE
router.get('/delete/:id', isAuthenticated, isAdmin, async (req, res) => {
  await Kendaraan.destroy({ where: { id_kendaraan: req.params.id } });
  res.redirect('/admin/kendaraan');
});

module.exports = router;
