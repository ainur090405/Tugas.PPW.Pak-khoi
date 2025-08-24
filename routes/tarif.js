const express = require('express');
const router = express.Router();
const Tarif = require('../models/Model_Tarif');

// cek login
function isLoggedIn(req, res, next) {
    if (!req.session.user) return res.redirect('/login');
    next();
}

// GET semua tarif
router.get('/', isLoggedIn, async (req, res) => {
    const tarif = await Tarif.getAll();
    res.render('tarif/index', { tarif });
});

// Form tambah tarif
router.get('/create', isLoggedIn, (req, res) => {
    res.render('tarif/create');
});

// Simpan tarif
router.post('/store', isLoggedIn, async (req, res) => {
    await Tarif.store(req.body);
    res.redirect('/tarif');
});

// Edit tarif
router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const tarif = await Tarif.getById(req.params.id);
    res.render('tarif/edit', { tarif });
});

// Update tarif
router.post('/update/:id', isLoggedIn, async (req, res) => {
    await Tarif.update(req.params.id, req.body);
    res.redirect('/tarif');
});

// Hapus tarif
router.get('/delete/:id', isLoggedIn, async (req, res) => {
    await Tarif.delete(req.params.id);
    res.redirect('/tarif');
});

module.exports = router;
