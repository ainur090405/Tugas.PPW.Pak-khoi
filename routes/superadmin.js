const express = require('express');
const router = express.Router();
const { isAuthenticated, isSuperAdmin } = require('../middleware/auth');

// Dashboard Superadmin
router.get('/', isAuthenticated, isSuperAdmin, (req, res) => {
  res.render('superadmin/dashboard', { user: req.session.user });
});

module.exports = router;
