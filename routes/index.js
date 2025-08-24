const express = require('express');
const router = express.Router();

// middleware cek login
function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

// halaman root -> redirect ke login
router.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.redirect('/login');
});

// dashboard sesuai role
router.get('/dashboard', isLoggedIn, (req, res) => {
  const user = req.session.user;
  if (user.role === 'superadmin') {
    res.render('users/super', { user });
  } else {
    res.render('users/index', { users: [user] }); 
  }
});

// halaman login
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// halaman register
router.get('/register', (req, res) => {
  res.render('auth/register');
});

module.exports = router;
