var createError = require('http-errors');
var express = require('express');
const { check, validationResult } = require('express-validator');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

app.get('/', function(req, res){
  res.render('MacroTracker', { })
});

app.get('/workoutTracker', function(req, res){
  res.render('workoutTracker', { })
});

app.get('/macroTracker', function(req, res){
  res.render('macroTracker', { })
});

module.exports = app;


app.post('/form', [


  check('weight').isNumeric().withMessage("Must be a number greater than 0."),
  check('age').isNumeric().withMessage("Must be a number greater than 0."),
  check('height').isNumeric().withMessage("Must be a number greater than 0.")
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const weight  = req.body.weightSelection;
  const age = req.body.ageSelection;
  const height   = req.body.heightSelection;


})
