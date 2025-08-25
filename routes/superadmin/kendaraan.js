const express = require('express');
const router = express.Router();
const { isAuthenticated, isSuperAdmin } = require('../../middleware/auth');
const Kendaraan = require('../../models/Model_Kendaraan');
const Tarif = require('../../models/Model_Tarif');

// READ
router.get('/', isAuthenticated, isSuperAdmin, async (req, res) => {
  const data = await Kendaraan.findAll({ include: Tarif });
  res.render('superadmin/kendaraan/index', { kendaraan: data });
});

module.exports = router;
// (sisanya CREATE, EDIT, DELETE sama seperti admin)
