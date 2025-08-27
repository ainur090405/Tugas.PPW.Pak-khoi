const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../../middleware/auth');
const Pengunjung = require('../../models/Model_Pengunjung');
const Kendaraan = require('../../models/Model_Kendaraan');

// ================= READ =================
// list pengunjung
router.get('/', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const data = await Pengunjung.getAll(); // include kendaraan
    res.render('admin/pengunjung/index', { pengunjung: data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan saat memuat data pengunjung");
  }
});

// ================= CREATE =================
// form tambah
router.get('/create', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const kendaraan = await Kendaraan.getAll(); // biar bisa pilih kendaraan
    res.render('admin/pengunjung/create', { kendaraan });
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal memuat form tambah pengunjung");
  }
});

// simpan tambah
router.post('/create', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { wajah, pakaian, jenis_kelamin, id_kendaraan } = req.body;
    await Pengunjung.createPengunjung({ wajah, pakaian, jenis_kelamin, id_kendaraan });
    res.redirect('/admin/pengunjung');
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal menambah data pengunjung");
  }
});

// ================= UPDATE =================
// form edit
router.get('/edit/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const data = await Pengunjung.getById(req.params.id);
    const kendaraan = await Kendaraan.getAll();
    res.render('admin/pengunjung/edit', { pengunjung: data, kendaraan });
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal memuat form edit pengunjung");
  }
});

// simpan edit
router.post('/edit/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { wajah, pakaian, jenis_kelamin, id_kendaraan } = req.body;
    await Pengunjung.updatePengunjung(req.params.id, { wajah, pakaian, jenis_kelamin, id_kendaraan });
    res.redirect('/admin/pengunjung');
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal mengubah data pengunjung");
  }
});

// ================= DELETE =================
router.get('/delete/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    await Pengunjung.deletePengunjung(req.params.id);
    res.redirect('/admin/pengunjung');
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal menghapus data pengunjung");
  }
});

module.exports = router;
