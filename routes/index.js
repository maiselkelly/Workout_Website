const express = require('express');
const router = express.Router();
const bodyparser=require('body-parser');
const MacroCalc = require('./MacroCalc');
const {Client } = require('pg');
const session = require('express-session');
const path = require('path');
const bcrypt = ('bcryptjs');
const cookieSession = require('cookie-session');



const client = new Client({
  host: 'localhost',
  user: 'kellymaisel',
  port: 5432,
  query_timeout: 500,
  password:'Oliver21',
  database: 'workoutwebsite'
})

client.connect();


//Get Macro Calc
router.get('/MacroCalc', function(req, res, next) {
  res.render('MacroCalc', { title: 'House of Gainz Fitness'});
});

router.get('/MacroCalcHidden', function(req, res, next) {
  res.render('MacroCalcHidden', {title: 'House of Gainz Fitness'});
});

//Get exercise Results
router.get('/workoutresult', function(req, res, next){

  const text = 'SELECT inputdate, exerciseinput, workoutsets, workoutreps FROM exercises'

  let query = client.query(text, (err, result)=> {
    res.render('workoutresult',  { title: 'House of Gainz Fitness', exercises: result.rows});
  })
});


//Get workout Tracker
router.get('/workoutTracker', function(req, res, next) {
  res.render('workoutTracker', {title: 'House of Gainz Fitness'});

});


//Get cardio Tracker
router.get('/cardioResult', function(req, res, next) {

  const text = 'SELECT inputdate, cardio_workout, cardio_time FROM cardio'

  let query = client.query(text, (err, result)=> {
    res.render('cardioresult', { title: 'House of Gainz Fitness', cardio: result.rows});
  })

});

//Get macro Tracker
router.get('/macroResult', function(req, res, next) {

  const text = 'SELECT inputdate, weight, bulkorcut, calories, protein, fat, carbs FROM macrotracker'

  let query = client.query(text, (err, result)=> {
    res.render('macroresult', { title: 'House of Gainz Fitness', macrotracker: result.rows});
  })

});



//Get Macro Tracker
router.get('/macroTracker', function(req, res, next) {
  res.render('macroTracker', { title: 'House of Gainz Fitness'});
});


//Get About Page
router.get('/', function(req, res, next) {
  res.render('about', { title: 'House of Gainz Fitness'});
});


//Get Login Page
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'House of Gainz Fitness'});
});


//Get Register Page
router.get('/register', function(req, res, next){
  res.render('register', {title: 'House of Gainz Fitness'})
});


//Get User Main Page
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'House of Gainz Fitness'});
});





//Register Router
//auth/signUp
router.post('/submitregister', function (req, res, next) {
  let email = req.body.emailSelection;
  let password = req.body.passwordSelection;
  let firstname = req.body.fnameSelection;
  let lastname = req.body.lnameSelection;

  const text = 'INSERT INTO memberinfo(email, userpassword, firstname, lastname) ' +
      'VALUES($1, $2, $3, $4) RETURNING *'
  const values = [email, password, firstname, lastname]

  let query = client.query(text, values, (err, result)=> {
    console.log(err,result);
    console.log(query);
    // client.end();
  })

  res.redirect('/login');
})



//Login Authentication
router.post('/submitlogin', function(req, res) {


  let username = req.body.emailSelection;
  let password = req.body.passwordSelection;

  console.log(username);
  console.log(password);

  let sql = 'SELECT email, userpassword FROM memberinfo WHERE email = ? AND userpassword = ?'

  if (username && password) {
    client.query(sql, [username, password], function(err, result) {
          console.log(username);
          console.log(password);
            // req.session.emailSelection = username;
            // req.session.passwordSelection = password;
            res.redirect('/home');
          // } else {
          //   res.send('Incorrect Username and/or Password!');
          // }
          res.end();
        });
  } else {
    res.send('Please enter Username and Password!');
    // res.end();
  }
});


//Exercise Router
router.post('/submitworkout', function(req, res, next){
  let workout = req.body.workoutSelection;
  let sets = req.body.setSelection;
  let reps = req.body.repSelection;
  let date = req.body.dateSelection;

  const text = 'INSERT INTO exercises(inputdate, exerciseinput, workoutsets, workoutreps) ' +
      'VALUES($1, $2, $3, $4) RETURNING *'
  const values = [date, workout, sets, reps]

  let query = client.query(text, values, (err, result)=> {
    console.log(err,result);
    console.log(query);
    // client.end();
  })

  res.redirect('/workoutTracker');
})



//Cardio Router
router.post('/submitcardio', function(req, res, next){
  let date = req.body.dateSelection;
  let cardio = req.body.cardioSelection;
  let time = req.body.timeSelection;

  const text = 'INSERT INTO cardio(inputdate, cardio_workout, cardio_time) ' +
      'VALUES($1, $2, $3) RETURNING *'
  const values = [date, cardio, time]


  let query = client.query(text, values, (err, result)=> {
    console.log(err,result);
    console.log(query);
    // client.end();
  })

 res.redirect('/workoutTracker');
})



//Macro Router
router.post('/submitmacros', function(req, res, next){
  let date = req.body.date;
  let weight = req.body.weightCheck;
  let bulkorcut = req.body.BCM;
  let calories = req.body.calCheck;
  let protein = req.body.proteinCheck;
  let fat = req.body.fatCheck;
  let carbs = req.body.carbCheck;

  const text = 'INSERT INTO macrotracker(inputdate, weight, bulkorcut, calories, protein, fat, carbs) ' +
      'VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
  const values = [date, weight, bulkorcut, calories, protein, fat, carbs]



  let query = client.query(text, values, (err, result)=> {
    console.log(err,result);
    console.log(query);
    // client.end();
  })

   res.redirect('/macroTracker');
})




//Posting to results page for macro calculator
router.post('/', function (req, res, next) {

  let weight = req.body.weightSelection;
  let ddlselect = req.body.ddlselect;
  let age = req.body.ageSelection;
  let height = req.body.heightSelection;
  let BMRselect = req.body.radio;


  let cutCal = MacroCalc.cuttingCals(weight);
  let cutPro = MacroCalc.cuttingProtein(weight);
  let cutFat = MacroCalc.cuttingFat(weight);
  let cutCarb = MacroCalc.cuttingCarbs();

  let mainCal = MacroCalc.maintainCals(weight);
  let mainPro = MacroCalc.maintainProtein(weight);
  let mainFat = MacroCalc.maintainFat(weight);
  let mainCarb = MacroCalc.maintainCarbs();

  let bulkCal = MacroCalc.bulkCals(weight);
  let bulkPro = MacroCalc.bulkProtein(weight);
  let bulkFat = MacroCalc.bulkFat(weight);
  let bulkCarb = MacroCalc.bulkCarbs();

  let BMI = MacroCalc.findBMI(weight, height);
  let wBMR = MacroCalc.womenBMR(age, weight, height);
  let mBMR = MacroCalc.menBMR(age, weight, height);


  if(ddlselect == 'Cut')
  res.render('results', {weight: weight, ddlselect: ddlselect,
    calories:cutCal, protein:cutPro, fat:cutFat, carbs:cutCarb})

  else if(ddlselect == 'Maintain')
    res.render('results', {weight: weight, ddlselect: ddlselect,
      calories:mainCal, protein:mainPro, fat:mainFat, carbs:mainCarb})

  else if(ddlselect == 'Bulk')
    res.render('results', {weight: weight, ddlselect: ddlselect,
      calories:bulkCal, protein:bulkPro, fat:bulkFat, carbs:bulkCarb})

  if(BMRselect == "man")
    res.render('results', {BMI:BMI, BMR: mBMR})

   else if(BMRselect == "woman")
    res.render('results', {BMI:BMI, BMR: wBMR})


})



//Posting to hiddenresults page for macro calculator
router.post('/hidden', function (req, res, next) {

  let weight = req.body.weightSelection;
  let ddlselect = req.body.ddlselect;
  let age = req.body.ageSelection;
  let height = req.body.heightSelection;
  let BMRselect = req.body.radio;


  let cutCal = MacroCalc.cuttingCals(weight);
  let cutPro = MacroCalc.cuttingProtein(weight);
  let cutFat = MacroCalc.cuttingFat(weight);
  let cutCarb = MacroCalc.cuttingCarbs();

  let mainCal = MacroCalc.maintainCals(weight);
  let mainPro = MacroCalc.maintainProtein(weight);
  let mainFat = MacroCalc.maintainFat(weight);
  let mainCarb = MacroCalc.maintainCarbs();

  let bulkCal = MacroCalc.bulkCals(weight);
  let bulkPro = MacroCalc.bulkProtein(weight);
  let bulkFat = MacroCalc.bulkFat(weight);
  let bulkCarb = MacroCalc.bulkCarbs();

  let BMI = MacroCalc.findBMI(weight, height);
  let wBMR = MacroCalc.womenBMR(age, weight, height);
  let mBMR = MacroCalc.menBMR(age, weight, height);


  if(ddlselect == 'Cut')
    res.render('resultsHidden', {weight: weight, ddlselect: ddlselect,
      calories:cutCal, protein:cutPro, fat:cutFat, carbs:cutCarb})

  else if(ddlselect == 'Maintain')
    res.render('resultsHidden', {weight: weight, ddlselect: ddlselect,
      calories:mainCal, protein:mainPro, fat:mainFat, carbs:mainCarb})

  else if(ddlselect == 'Bulk')
    res.render('resultsHidden', {weight: weight, ddlselect: ddlselect,
      calories:bulkCal, protein:bulkPro, fat:bulkFat, carbs:bulkCarb})

  if(BMRselect == "man")
    res.render('resultsHidden', {BMI:BMI, BMR: mBMR})

  else if(BMRselect == "woman")
    res.render('resultsHidden', {BMI:BMI, BMR: wBMR})


})


module.exports = router;


