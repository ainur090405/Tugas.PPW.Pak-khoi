const express = require('express');
const router = express.Router();
const { isAuthenticated, isSuperAdmin } = require('../../middleware/auth');
const Pengunjung = require('../../models/Model_Pengunjung');
const Kendaraan = require('../../models/Model_Kendaraan');

// ========================= READ - LIST =========================
router.get('/', isAuthenticated, isSuperAdmin, async (req, res) => {
  try {
    const data = await Pengunjung.getAll(); // pakai method dari model
    res.render('superadmin/pengunjung/index', { pengunjung: data, error: req.flash('error') });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Gagal mengambil data pengunjung!');
    res.redirect('/superadmin');
  }
});

// ========================= CREATE - FORM =========================
router.get('/create', isAuthenticated, isSuperAdmin, async (req, res) => {
  try {
    const kendaraan = await Kendaraan.getAll();
    res.render('superadmin/pengunjung/create', { kendaraan, error: req.flash('error') });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Gagal membuka form tambah pengunjung!');
    res.redirect('/superadmin/pengunjung');
  }
});

// ========================= CREATE - ACTION =========================
router.post('/create', isAuthenticated, isSuperAdmin, async (req, res) => {
  const { wajah, pakaian, jenis_kelamin, id_kendaraan } = req.body;

  try {
    // validasi id_kendaraan
    const kendaraan = await Kendaraan.getById(id_kendaraan);
    if (!kendaraan) {
      req.flash('error', 'Kendaraan tidak ditemukan!');
      return res.redirect('/superadmin/pengunjung/create');
    }

    await Pengunjung.createPengunjung({ wajah, pakaian, jenis_kelamin, id_kendaraan });
    res.redirect('/superadmin/pengunjung');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Gagal menyimpan data pengunjung!');
    res.redirect('/superadmin/pengunjung/create');
  }
});

// ========================= UPDATE - FORM =========================
router.get('/edit/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  try {
    const data = await Pengunjung.getById(req.params.id);
    if (!data) {
      req.flash('error', 'Pengunjung tidak ditemukan!');
      return res.redirect('/superadmin/pengunjung');
    }

    const kendaraan = await Kendaraan.getAll();
    res.render('superadmin/pengunjung/edit', { pengunjung: data, kendaraan, error: req.flash('error') });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Gagal membuka form edit pengunjung!');
    res.redirect('/superadmin/pengunjung');
  }
});

// ========================= UPDATE - ACTION =========================
router.post('/edit/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  const { wajah, pakaian, jenis_kelamin, id_kendaraan } = req.body;

  try {
    const kendaraan = await Kendaraan.getById(id_kendaraan);
    if (!kendaraan) {
      req.flash('error', 'Kendaraan tidak ditemukan!');
      return res.redirect(`/superadmin/pengunjung/edit/${req.params.id}`);
    }

    await Pengunjung.updatePengunjung(req.params.id, { wajah, pakaian, jenis_kelamin, id_kendaraan });
    res.redirect('/superadmin/pengunjung');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Gagal mengupdate data pengunjung!');
    res.redirect(`/superadmin/pengunjung/edit/${req.params.id}`);
  }
});

// ========================= DELETE =========================
router.get('/delete/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  try {
    await Pengunjung.deletePengunjung(req.params.id);
    res.redirect('/superadmin/pengunjung');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Gagal menghapus pengunjung!');
    res.redirect('/superadmin/pengunjung');
  }
});

module.exports = router;
