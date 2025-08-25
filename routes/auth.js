const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/Model_Users');

// GET - Login Page
router.get('/login', (req, res) => {
  const error = req.flash('error');
  res.render('auth/login', { error: error || [] }); // selalu ada error
});

// POST - Login Action
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      req.flash('error', 'User tidak ditemukan!');
      return res.redirect('/auth/login');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      req.flash('error', 'Password salah!');
      return res.redirect('/auth/login');
    }

    // simpan session
    req.session.user = {
      id: user.id_user,
      nama: user.nama,
      role: user.role
    };

    // redirect sesuai role
    if (user.role === 'superadmin') return res.redirect('/superadmin');
    if (user.role === 'admin') return res.redirect('/admin');

    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Terjadi kesalahan!');
    res.redirect('/auth/login');
  }
});

// GET - Register Page
router.get('/register', (req, res) => {
  res.render('auth/register', { error: req.flash('error') });
});

// POST - Register Action
router.post('/register', async (req, res) => {
  const { nama, email, password, role } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({ nama, email, password: hash, role });
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Gagal register, email mungkin sudah terdaftar!');
    res.redirect('/auth/register');
  }
});

// GET - Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
});

module.exports = router;
