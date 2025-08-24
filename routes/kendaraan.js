const express = require('express');
const router = express.Router();
const Kendaraan = require('../models/Model_Kendaraan');
const Tarif = require('../models/Model_Tarif');
const User = require('../models/Model_Users');

// cek login
function isLoggedIn(req, res, next) {
    if (!req.session.user) return res.redirect('/login');
    next();
}

// GET semua kendaraan (join users & tarif)
router.get('/', isLoggedIn, async (req, res) => {
    const kendaraan = await Kendaraan.getAll();
    res.render('kendaraan/index', { kendaraan });
});

// Form tambah kendaraan
router.get('/create', isLoggedIn, async (req, res) => {
    const users = await User.getAll();
    const tarif = await Tarif.getAll();
    res.render('kendaraan/create', { users, tarif });
});

// Simpan kendaraan
router.post('/store', isLoggedIn, async (req, res) => {
    await Kendaraan.store(req.body);
    res.redirect('/kendaraan');
});

// Edit kendaraan
router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const kendaraan = await Kendaraan.getById(req.params.id);
    const users = await User.getAll();
    const tarif = await Tarif.getAll();
    res.render('kendaraan/edit', { kendaraan, users, tarif });
});

// Update kendaraan
router.post('/update/:id', isLoggedIn, async (req, res) => {
    await Kendaraan.update(req.params.id, req.body);
    res.redirect('/kendaraan');
});

// Hapus kendaraan
router.get('/delete/:id', isLoggedIn, async (req, res) => {
    await Kendaraan.delete(req.params.id);
    res.redirect('/kendaraan');
});

module.exports = router;
