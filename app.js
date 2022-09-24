var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
let registered_ids = []
let initial_state = {id: 0, data: {}, received: []}
let blob = {...initial_state}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/publish', (req, res) => {
  let body = req.body
  blob.data = body.data
  blob.id = body.id
  blob.received = []
  res.send({success: true, blob: blob})
})

app.post('/register', (req, res) => {
  let body = req.body
  if (!registered_ids.includes(body.id)) {
    registered_ids.push(body.id)
  }
  res.send({"registered_ids": registered_ids})
})

app.post('/subscribe', (req, res) => {
  let body = req.body
  console.log(body)

  if (!blob.received.includes(body.id)) {
    blob.received.push(body.id)
  }

  if (blob.received.length == registered_ids.length) {
    console.log("TRIGG")
    blob = {...initial_state}
  }

  res.send({"registered_ids": registered_ids, "blob": blob})
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
