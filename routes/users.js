const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/Model_Users');
const { isAuthenticated } = require('../middleware/auth');

// GET - Form Ganti Password
router.get('/changepassword', isAuthenticated, (req, res) => {
  res.render('users/pwd', { 
    error: null, 
    success: null, 
    role: req.session.user.role 
  });
});

// POST - Update Password
router.post('/changepassword', isAuthenticated, async (req, res) => {
  const { newPassword } = req.body;

  try {
    const hash = await bcrypt.hash(newPassword, 10);

    // Pakai method dari model
    await User.updateUser(req.session.user.id, { password: hash });

    res.render('users/pwd', { 
      success: 'Password berhasil diubah!', 
      error: null,
      role: req.session.user.role 
    });
  } catch (err) {
    console.error(err);
    res.render('users/pwd', { 
      error: 'Gagal mengubah password!', 
      success: null,
      role: req.session.user.role 
    });
  }
});

module.exports = router;
