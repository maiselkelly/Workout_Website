const express = require('express');
const router = express.Router();
const MacroCalc = require('./MacroCalc');
const {Client } = require('pg');


const client = new Client({
  host: 'localhost',
  user: 'kellymaisel',
  port: 5432,
  query_timeout: 500,
  password:'Oliver21',
  database: 'workoutwebsite'
})

client.connect();


/* GET home page. */
router.get('/MacroCalc', function(req, res, next) {
  res.render('MacroCalc', { title: 'House of Gainz Fitness'});
});

router.get('/workoutTracker', function(req, res, next) {


  const text = 'SELECT inputdate, exerciseinput, workoutsets, workoutreps FROM exercises'


  let query = client.query(text, (err, result)=> {
    res.render('workoutTracker', { title: 'House of Gainz Fitness', exercises: result.rows});
  })


});

router.get('/macroTracker', function(req, res, next) {
  res.render('macroTracker', { title: 'House of Gainz Fitness'});
});

router.get('/', function(req, res, next) {
  res.render('about', { title: 'House of Gainz Fitness'});
});


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




  // //promise
  // client.query(text,values)
  //     .then(res =>{
  //       console.log(res.rows[0])
  //     })
  //     .catch(e=>console.error(e.stack))
  //
  // //async/await
  // try{
  //    const res = await client.query(text, values)
  //   console.log(res.rows[0])
  // }catch (err) {
  //   console.log(err.stack)
  // }

})



module.exports = router;


