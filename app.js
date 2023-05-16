var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
require("./dbconfig/dbconfig");

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.all('*', (req, res, next) => {
  console.log("invalid route")
  const err = new Error(`Can't find ${req.originalUrl} on the server`)
  err.status = 'failed'
  err.statusCode = 404
  next(err)
});

app.use((error, req, res, next) => {
  error.statuscode = error.statuscode || 500
  error.status = error.status || 'error'
  res.status(error.statusCode).json({
    status: error.statuscode,
    message: error.message
  })

})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
