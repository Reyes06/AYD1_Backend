var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var loginRouter = require('./routes/usuario.route');
var direccionRouter = require('./routes/direccion.route');
var formularioRouter = require('./routes/formulario.route');
var sectorRouter = require('./routes/sector.route');
var categoriaRouter = require('./routes/categoria.route');
var departamentoRouter = require('./routes/departamento.route');
var productoRouter = require('./routes/producto.route');
var tiendaRouter = require('./routes/tienda.route');
var testRouter = require('./routes/test.route');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/usuario', loginRouter);
app.use('/direccion', direccionRouter);
app.use('/formulario', formularioRouter);
app.use('/sector', sectorRouter);
app.use('/categoria', categoriaRouter);
app.use('/departamento', departamentoRouter);
app.use('/producto', productoRouter);
app.use('/tienda', tiendaRouter);
app.use('/test/integracion', testRouter);

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
