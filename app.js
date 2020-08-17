var createError = require('http-errors');
var express = require('express');
const { check, validationResult } = require('express-validator');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const bcrypt = require('bcrypt');
const session = require('express-session');



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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))



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
  res.render('about', { })
});

app.get('/workoutTracker', function(req, res){
  res.render('workoutTracker', { })
});

app.get('/macroCalc', function(req, res){
  res.render('macroCalc', { })
});

app.get('/macroTracker', function(req, res){
  res.render('macroTracker', { })
});

app.get('/workoutResults', function(req, res){
  res.render('workoutresult', { })
});

app.get('/cardioResults', function(req, res){
  res.render('cardioresult', { })
});

app.get('/macroResults', function(req, res){
  res.render('macroresult', { })
});

app.get('/login', function(req, res){
  res.render('login', { })
});

app.get('/register', function(req, res){
  res.render('register', { })
});

app.get('/home', function(req, res){
  res.render('home', { })
});

app.get('/MacroCalcHidden', function(req, res){
  res.render('MacroCalcHidden', { })
})

app.get('/submitlogin', function (req, res) {
  res.render('home')
})


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



