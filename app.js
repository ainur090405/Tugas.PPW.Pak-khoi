var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const superadminRouter = require('./routes/superadmin');
const adminKendaraan = require('./routes/admin/kendaraan');
const superKendaraan = require('./routes/superadmin/kendaraan');
const superTarif = require('./routes/superadmin/tarif');
const superUsers = require('./routes/superadmin/users');
const adminPengunjung = require('./routes/admin/pengunjung');
const superPengunjung = require('./routes/superadmin/pengunjung');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

// konfigurasi session (pakai bawaan express-session)
app.use(session({
  secret: 'ainur',              // ganti dengan string unik
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }   // 1 jam
}));

// supaya session bisa diakses dari semua view (EJS)
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/superadmin', superadminRouter);
app.use('/admin/kendaraan', adminKendaraan);
app.use('/admin/pengunjung', adminPengunjung);
app.use('/superadmin/kendaraan', superKendaraan);
app.use('/superadmin/tarif', superTarif);
app.use('/superadmin/users', superUsers);
app.use('/superadmin/pengunjung', superPengunjung);

// catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
