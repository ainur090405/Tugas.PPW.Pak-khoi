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
    role: req.session.user.role // ⬅️ tambahkan ini
  });
});

// POST - Update Password
router.post('/changepassword', isAuthenticated, async (req, res) => {
  const { newPassword } = req.body;

  try {
    const hash = await bcrypt.hash(newPassword, 10);
    await User.update(
      { password: hash },
      { where: { id_user: req.session.user.id } }
    );

    res.render('users/pwd', { 
      success: 'Password berhasil diubah!', 
      error: null,
      role: req.session.user.role // ⬅️ tambahkan juga di sini
    });
  } catch (err) {
    res.render('users/pwd', { 
      error: 'Gagal mengubah password!', 
      success: null,
      role: req.session.user.role // ⬅️ ini juga
    });
  }
});

module.exports = router;
