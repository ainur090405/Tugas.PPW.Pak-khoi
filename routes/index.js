const express = require('express');
const router = express.Router();

// halaman utama
router.get('/', (req, res) => {
  // kalau belum login, redirect ke login
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  // kalau sudah login, redirect sesuai role
  if (req.session.user.role === 'superadmin') {
    return res.redirect('/superadmin');
  } else if (req.session.user.role === 'admin') {
    return res.redirect('/admin');
  }

  res.render('index', { title: 'Dashboard' });
});

module.exports = router;
