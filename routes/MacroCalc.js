

function cuttingCals(weight){
     cCal = weight *11;
     return parseFloat(cCal).toFixed(2);

}

function cuttingProtein(weight){
    cPro = weight * 1.1;
    return parseFloat(cPro).toFixed(2);
}

function cuttingFat(weight){
    cFat = weight * 0.3;
    return parseFloat(cFat).toFixed(2);
}

function cuttingCarbs(){
    cCarbs = (cCal - cPro*4 - cFat*9) /4;
    return parseFloat(cCarbs).toFixed(2);
}

function maintainCals(weight){
    mCal = weight * 14;
    return parseFloat(mCal).toFixed(2);
}

function maintainProtein(weight){
    mPro = weight * 1;
    return parseFloat(mPro).toFixed(2);
}

function maintainFat(weight){
    mFat = weight * 0.35;
    return parseFloat(mFat).toFixed(2);
}

function maintainCarbs(){
    mCarbs = (mCal - mPro*4 - mFat*9) /4;
    return parseFloat(mCarbs).toFixed(2);
}

function bulkCals(weight){
    bCal = weight * 16;
    return parseFloat(bCal).toFixed(2);
}

function bulkProtein(weight){
    bPro = weight * 1.1;
    return parseFloat(bPro).toFixed(2);
}

function bulkFat(weight){
    bFat = weight * 0.4;
    return parseFloat(bFat).toFixed(2);
}

function bulkCarbs(){
    bCarbs = (bCal - bPro*4 - bFat*9) /4;
    return parseFloat(bCarbs).toFixed(2);
}


function findBMI(weight, height){
    BMI = ((weight * 703) / (height * height));
    return parseFloat(BMI).toFixed(2);
}



function womenBMR(age, weight, height){
    BMR = (665.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age));
    return parseFloat(BMR).toFixed(2);
}

function menBMR(age, weight, height){
    BMR = (66.47 + (6.24 * weight) + (12.7 * height) - (6.755 * age));
    return parseFloat(BMR).toFixed(2);
}

module.exports.cuttingCals = cuttingCals;
module.exports.cuttingProtein = cuttingProtein;
module.exports.cuttingFat = cuttingFat;
module.exports.cuttingCarbs = cuttingCarbs;

module.exports.maintainCals = maintainCals;
module.exports.maintainProtein = maintainProtein;
module.exports.maintainFat = maintainFat;
module.exports.maintainCarbs = maintainCarbs;

module.exports.bulkCals = bulkCals;
module.exports.bulkProtein = bulkProtein;
module.exports.bulkFat = bulkFat;
module.exports.bulkCarbs = bulkCarbs;

module.exports.findBMI = findBMI;
module.exports.womenBMR = womenBMR;
module.exports.menBMR = menBMR;

// <% if( dkskns ){ %>
