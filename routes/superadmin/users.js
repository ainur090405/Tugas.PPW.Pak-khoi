const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { isAuthenticated, isSuperAdmin } = require('../../middleware/auth');
const User = require('../../models/Model_Users');

// READ - List Users
router.get('/', isAuthenticated, isSuperAdmin, async (req, res) => {
  const data = await User.findAll();
  res.render('superadmin/users/index', { users: data });
});

// CREATE - Form
router.get('/create', isAuthenticated, isSuperAdmin, (req, res) => {
  res.render('superadmin/users/create');
});

// CREATE - Action
router.post('/create', isAuthenticated, isSuperAdmin, async (req, res) => {
  const { nama, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await User.create({ nama, email, password: hash, role });
  res.redirect('/superadmin/users');
});

// UPDATE - Form
router.get('/edit/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  const data = await User.findByPk(req.params.id);
  res.render('superadmin/users/edit', { user: data });
});

// UPDATE - Action
router.post('/edit/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  const { nama, email, role } = req.body;
  await User.update(
    { nama, email, role },
    { where: { id_user: req.params.id } }
  );
  res.redirect('/superadmin/users');
});

// DELETE
router.get('/delete/:id', isAuthenticated, isSuperAdmin, async (req, res) => {
  await User.destroy({ where: { id_user: req.params.id } });
  res.redirect('/superadmin/users');
});

module.exports = router;
