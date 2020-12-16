var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//================ Conexion a la BD

var con = require('./dbcontroller/dbconnection');

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//=================================

var loginRouter = require('./routes/usuario.route');
var direccionRouter = require('./routes/direccion.route');
var tiendaRouter = require('./routes/formulario.route');
var sectorRouter = require('./routes/sector.route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/usuario', loginRouter);
app.use('/direccion', direccionRouter);
app.use('/formulario', tiendaRouter);
app.use('/sector', sectorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
