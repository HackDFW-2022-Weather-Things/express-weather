var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
let ids = []
let blob = {id: 0, data: {}, received: []}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/publish', (req, res) => {
  req = req.body
  blob.data = req.data
  blob.id = req.id
  res.send({success: true})
})

const getData = async (id) => {
  //await blob.data change
  blob.received.push(id)
  return data
}

app.post('/subscribe', async (req, res) => {
  ids.push(req.id)
  data = await getData(req.id)
  res.send(data)
})

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
