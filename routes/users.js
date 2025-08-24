const express = require('express');
const router = express.Router();
const User = require('../models/Model_Users');

// Middleware cek login
function isLoggedIn(req, res, next) {
    if (!req.session.user) return res.redirect('/login');
    next();
}

// Middleware cek role superadmin
function isSuperadmin(req, res, next) {
    if (req.session.user.role !== 'superadmin') {
        return res.status(403).send('Akses ditolak: hanya superadmin!');
    }
    next();
}

// GET semua user (hanya superadmin)
router.get('/', isLoggedIn, isSuperadmin, async (req, res) => {
    const users = await User.getAll();
    res.render('users/index', { users });
});

// Register user baru
router.post('/register', async (req, res) => {
    await User.store(req.body);
    res.redirect('/login');
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.login(email, password);

    if (!user) return res.send('Login gagal!');

    req.session.user = user;
    res.redirect('/dashboard');
});

// Logout user
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Update user (superadmin)
router.post('/update/:id', isLoggedIn, isSuperadmin, async (req, res) => {
    await User.update(req.params.id, req.body);
    res.redirect('/users');
});

// Delete user (superadmin)
router.get('/delete/:id', isLoggedIn, isSuperadmin, async (req, res) => {
    await User.delete(req.params.id);
    res.redirect('/users');
});

// Form ganti password
router.get('/changepassword', isLoggedIn, (req, res) => {
    res.render('users/pwd');
});

// Proses ganti password
router.post('/changepassword', isLoggedIn, async (req, res) => {
    try {
        const { newPassword } = req.body;

        // update password di database
        await User.changePassword(req.session.user.id_user, newPassword);

        // kasih pesan sukses pake flash
        req.flash('success', 'Password berhasil diganti!');
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Gagal mengganti password!');
        res.redirect('/users/changepassword');
    }
});


module.exports = router;
