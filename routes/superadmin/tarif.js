const express = require('express');
const router = express.Router();
const { isAuthenticated, isSuperAdmin } = require('../../middleware/auth');
const Tarif = require('../../models/Model_Tarif');

// READ - List Tarif
router.get('/', isAuthenticated, isSuperAdmin, async (req, res) => {
  const data = await Tarif.getAll(); // pakai method dari model
  res.render('superadmin/tarif/index', { tarif: data });
});

// CREATE - Form
router.get('/create', isAuthenticated, isSuperAdmin, (req, res) => {
  res.render('superadmin/tarif/create');
});

// CREATE - Action
router.post('/create', isAuthenticated, isSuperAdmin, async (req, res) => {
  const { type, harga, satuan_waktu } = req.body;
  await Tarif.createTarif({ type, harga, satuan_waktu }); // pakai method dari model
  res.redirect('/superadmin/tarif');
});

// UPDATE - Form
router.get('/edit/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  const data = await Tarif.getById(req.params.id); // pakai method dari model
  res.render('superadmin/tarif/edit', { tarif: data });
});

// UPDATE - Action
router.post('/edit/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  const { type, harga, satuan_waktu } = req.body;
  await Tarif.updateTarif(req.params.id, { type, harga, satuan_waktu }); // pakai method dari model
  res.redirect('/superadmin/tarif');
});

// DELETE
router.get('/delete/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  await Tarif.deleteTarif(req.params.id); // pakai method dari model
  res.redirect('/superadmin/tarif');
});

module.exports = router;
