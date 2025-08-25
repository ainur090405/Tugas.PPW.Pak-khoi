const express = require('express');
const router = express.Router();
const { isAuthenticated, isSuperAdmin } = require('../../middleware/auth');
const Tarif = require('../../models/Model_Tarif');

// READ - List Tarif
router.get('/', isAuthenticated, isSuperAdmin, async (req, res) => {
  const data = await Tarif.findAll();
  res.render('superadmin/tarif/index', { tarif: data });
});

// CREATE - Form
router.get('/create', isAuthenticated, isSuperAdmin, (req, res) => {
  res.render('superadmin/tarif/create');
});

// CREATE - Action
router.post('/create', isAuthenticated, isSuperAdmin, async (req, res) => {
  const { type, harga, satuan_waktu } = req.body;
  await Tarif.create({ type, harga, satuan_waktu });
  res.redirect('/superadmin/tarif');
});

// UPDATE - Form
router.get('/edit/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  const data = await Tarif.findByPk(req.params.id);
  res.render('superadmin/tarif/edit', { tarif: data });
});

// UPDATE - Action
router.post('/edit/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  const { type, harga, satuan_waktu } = req.body;
  await Tarif.update(
    { type, harga, satuan_waktu },
    { where: { id_tarif: req.params.id } }
  );
  res.redirect('/superadmin/tarif');
});

// DELETE
router.get('/delete/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  await Tarif.destroy({ where: { id_tarif: req.params.id } });
  res.redirect('/superadmin/tarif');
});

module.exports = router;
