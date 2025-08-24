const express = require('express');
const router = express.Router();
const Pengunjung = require('../models/Model_Pengunjung');
const Kendaraan = require('../models/Model_Kendaraan');

// cek login
function isLoggedIn(req, res, next) {
    if (!req.session.user) return res.redirect('/login');
    next();
}

// GET semua pengunjung
router.get('/', isLoggedIn, async (req, res) => {
    const pengunjung = await Pengunjung.getAll();
    res.render('pengunjung/index', { pengunjung });
});

// Form tambah pengunjung
router.get('/create', isLoggedIn, async (req, res) => {
    const kendaraan = await Kendaraan.getAll();
    res.render('pengunjung/create', { kendaraan });
});

// Simpan pengunjung
router.post('/store', isLoggedIn, async (req, res) => {
    await Pengunjung.store(req.body);
    res.redirect('/pengunjung');
});

// Edit pengunjung
router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const pengunjung = await Pengunjung.getById(req.params.id);
    const kendaraan = await Kendaraan.getAll();
    res.render('pengunjung/edit', { pengunjung, kendaraan });
});

// Update pengunjung
router.post('/update/:id', isLoggedIn, async (req, res) => {
    await Pengunjung.update(req.params.id, req.body);
    res.redirect('/pengunjung');
});

// Hapus pengunjung
router.get('/delete/:id', isLoggedIn, async (req, res) => {
    await Pengunjung.delete(req.params.id);
    res.redirect('/pengunjung');
});

module.exports = router;
