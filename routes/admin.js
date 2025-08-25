const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Dashboard Admin
router.get('/', isAuthenticated, isAdmin, (req, res) => {
  res.render('admin/dashboard', { user: req.session.user });
});

module.exports = router;
