function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
}

function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  res.status(403).send('Access Denied: Admin only');
}

function isSuperAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'superadmin') {
    return next();
  }
  res.status(403).send('Access Denied: Superadmin only');
}

module.exports = { isAuthenticated, isAdmin, isSuperAdmin };
