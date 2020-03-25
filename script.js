
var squareMeter,
    orientation, 
    orientationCoefficient,
    shadowCoefficient,
    kWhCost,
    yearlySavings,
    monthlySavings,
    paybackTime,
    resultsROI,
    interestRate,
    loanCost,
    paybackTimeWithoutOptimizer,
    houseValue,
    houseValueIncrease,
    sunRadiance,
    panelEfficiency,
    losses,
    avgPrice;

squareMeter = 1;
orientation = 1;
orientationCoefficient = 1;
shadowCoefficient= 0.9;
kWhCost = 1;
ROI = 1;
yearlySavings = 1;
monthlySavings = 1;
paybackTime = 1;
paybackTimeWithoutOptimizer = 1;
interestRate = 1,
loanCost = 1,
houseValue = 1,
houseValueIncrease = 1;
avgPrice = 2176;


sunRadiance = 950;
losses = 0.816;
panelEfficiency = 0.1918;



var slider1 = document.getElementById('slider1')
var slider2 = document.getElementById('slider2')
var slider3 = document.getElementById('slider3')
var slider4 = document.getElementById('slider4')
var slider5 = document.getElementById('slider5')
var slider6 = document.getElementById('slider6')
var slider7 = document.getElementById('slider7')

//SLIDERS

//SLIDER 1 = SQUARE METERS

slider1.addEventListener('input', function (){
    squareMeter = slider1.value;
    document.getElementById('value1').innerHTML = squareMeter;

    var x = squareMeter * (100 / slider1.max);
    color = 'linear-gradient(90deg, rgb(255,208,20)' + x + '% , rgb(214, 214, 214)' + x + '%)';
    slider1.style.background = color;

   calcAndUpdate();

});

//SLIDER 2 = HOUSE ORIENTATION

slider2.addEventListener('input', function (){

    orientation = slider2.value;
    document.getElementById('value2').innerHTML = orientation;

    if (orientation == 1) {
        orientationCoefficient = 0.70
        document.getElementById('value2').innerHTML = "Nordlig"
    } else if (orientation == 2) {
        orientationCoefficient = 0.82
        document.getElementById('value2').innerHTML = "Västlig"
    } else if (orientation == 3) {
        orientationCoefficient = 1
        document.getElementById('value2').innerHTML = "Sydlig"
    } else if (orientation == 4) {
        orientationCoefficient = 0.82
        document.getElementById('value2').innerHTML = "Östlig"
    } else {
        orientationCoefficient = 0.89
        document.getElementById('value2').innerHTML = "Platt"
    };

    var x = orientation * (100 / slider2.max);
    color = 'linear-gradient(90deg, rgb(255,208,20)' + x + '% , rgb(214, 214, 214)' + x + '%)';
    slider2.style.background = color;

    calcAndUpdate();
});

//SLIDER 3 = COST PER KWH

slider3.addEventListener('input', function (){
    kWhCost = slider3.value;
    document.getElementById('value3').innerHTML = kWhCost;

    var x = kWhCost * (100 / slider3.max);
    color = 'linear-gradient(90deg, rgb(255,208,20)' + x + '% , rgb(214, 214, 214)' + x + '%)';
    slider3.style.background = color;

    calcAndUpdate();
});

//SLIDER 4 = Skuggning

slider4.addEventListener('input', function (){
    var input = slider4.value;
    document.getElementById('value4').innerHTML = input;

    if (input == 1) {
        shadowCoefficient = 1
        document.getElementById('value4').innerHTML = "Förekommer"
    } else if (input == 2) {
        shadowCoefficient = 0.9
        document.getElementById('value4').innerHTML = "Ingen skuggning"
    } else {
    }

    var x = input * (100 / slider4.max);
    color = 'linear-gradient(90deg, rgb(255, 215, 56)' + x + '% , rgb(214, 214, 214)' + x + '%)';
    slider4.style.background = color;

    calcAndUpdate();
});

//SLIDER 5 = Husvärdeökning

slider5.addEventListener('input', function (){
    
    var factorHouseValueIncrease =  0.12

    var input = slider5.value;
    document.getElementById('value5').innerHTML = input;

    houseValue = input 
    houseValueIncrease = houseValue * factorHouseValueIncrease

    var x = input * (100 / slider5.max);
    color = 'linear-gradient(90deg, rgb(255, 215, 56)' + x + '% , rgb(214, 214, 214)' + x + '%)';
    slider5.style.background = color;

    calcAndUpdate();

});

//SLIDER 6 = Ränta

slider6.addEventListener('input', function (){
    var input = slider6.value;
    document.getElementById('value6').innerHTML = input;

    var x = input * (100 / slider6.max);
    color = 'linear-gradient(90deg, rgb(255, 215, 56)' + x + '% , rgb(214, 214, 214)' + x + '%)';
    slider6.style.background = color;

    calcAndUpdate();

});

//SLIDER 7 = Lånets löptid

slider7.addEventListener('input', function (){
    var input = slider7.value;
    document.getElementById('value7').innerHTML = input;

    var x = input * (100 / slider7.max);
    color = 'linear-gradient(90deg, rgb(255, 215, 56)' + x + '% , rgb(214, 214, 214)' + x + '%)';
    slider7.style.background = color;

    calcAndUpdate();

});



// FUNCTIONS

function calcAndUpdate(){
    console.log('-------------------')
    console.log('START')
    console.log('Yearly savings before calc: ' + yearlySavings)
    calculateSavings(squareMeter, kWhCost);
    console.log('Yearly savings after calc: ' + yearlySavings)
    console.log('----')

    monthlySavings = yearlySavings / 12
    yearlySavings = yearlySavings.toFixed(0)
    monthlySavings = monthlySavings.toFixed(0)

    paybackTime = (squareMeter * shadowCoefficient * avgPrice) / yearlySavings 

    resultsROI = 1 / paybackTime * 100

    console.log('squareMeter: ' + squareMeter)
    console.log('shadowCoefficient: ' + shadowCoefficient)
    console.log('avgPrice: ' + avgPrice)
    console.log('houseValueIncrease: ' + houseValueIncrease)
    console.log('yearlySavings = ' +  yearlySavings)
    console.log('monthlySavings = ' + monthlySavings)
    console.log('paybackTime = ' + paybackTime)
    console.log('resultsROI = ' + resultsROI)
    console.log('loanCost = ' + loanCost)

    document.getElementById('yearlySaving').textContent = numberWithSeparator(yearlySavings)
    document.getElementById('monthlySaving').textContent = numberWithSeparator(monthlySavings)
    document.getElementById('paybackTime').textContent = paybackTime.toFixed(1)
    document.getElementById('resultsROI').textContent = resultsROI.toFixed(1)
    document.getElementById('loanCost').textContent = loanCost
    document.getElementById('valueIncrease').textContent = numberWithSeparator(houseValueIncrease.toFixed(0))
}



// Fixing thousand separator
function numberWithSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Calculate total price

function calculateSavings(squareMeter, kWhCost) {
    //Calculating totalSavings per year
    

    yearlySavings = squareMeter * kWhCost * sunRadiance * losses * panelEfficiency

    return yearlySavings;
}

function hittaAnnuitet(lånebelopp, årsränta, antalÅr) {
    var annuitet, lånebelopp, årsränta, månadsränta, antalÅr, antalÅterbetalningar, a

    //                          p(1+p)^antalåterbetalningar
    // Annuitet = lånebelopp * ----------------------------
    //                         (1+p)^antalåterbetalningar - 1

    månadsränta = årsränta / 12
    antalÅterbetalningar = antalÅr * 12

    a = ((1 + månadsränta)**antalÅterbetalningar)

    annuitet = lånebelopp * ((månadsränta*a)/(a-1))

    return annuitet

}


