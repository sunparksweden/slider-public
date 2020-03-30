
var squareMeter,
    orientation,
    orientationCoefficient,
    shadowCoefficient,
    kWhCost,

    yearlySavings,
    monthlySavings,

    paybackTime,
    paybackTimeWithoutOptimizer,
    percentageROI,

    loanPeriod,
    loanTotalCost,
    interestRate,
    monthlyLoanCost,
    monthlyNet,

    houseValue,
    houseValueIncrease,

    sunRadiance,
    panelEfficiency,
    losses,
    avgPricePerSQM;

squareMeter = 1;
orientation = 1;
orientationCoefficient = 1;
shadowCoefficient = 0.9;
kWhCost = 1;
yearlySavings = 1;
monthlySavings = 1;
paybackTime = 1;
paybackTimeWithoutOptimizer = 1;
loanPeriod = 12;
loanTotalCost = 1;
interestRate = 4,
    monthlyLoanCost = 1,
    monthlyNet = 1,
    houseValue = 1,
    houseValueIncrease = 1,
    totalProjectPrice = 1,
    avgPricePerSQM = 2178 //2500; // 2176 rough estimate, 2500 as sad case


sunRadiance = 950;
losses = 0.816;
panelEfficiency = 0.1918;


// Getting the slider inputs from the DOM
var slider1 = document.getElementById('slider1')
var slider2 = document.getElementById('slider2')
var slider3 = document.getElementById('slider3')
var slider4 = document.getElementById('slider4')
var slider5 = document.getElementById('slider5')
var slider6 = document.getElementById('slider6')
var slider7 = document.getElementById('slider7')

var showTableButton = document.getElementById('show-button')




//SLIDERS

//SLIDER 1 = SQUARE METERS

slider1.addEventListener('input', function () {
    squareMeter = slider1.value;
    document.getElementById('value1').innerHTML = squareMeter;

    var x = squareMeter * (100 / slider1.max);
    color = 'linear-gradient(90deg, rgb(255,208,20)' + x + '% , rgb(214, 214, 214)' + x + '%)';
    slider1.style.background = color;

    calcAndUpdate();

});

//SLIDER 2 = HOUSE ORIENTATION

slider2.addEventListener('input', function () {

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

slider3.addEventListener('input', function () {
    kWhCost = slider3.value;
    document.getElementById('value3').innerHTML = kWhCost;

    var x = kWhCost * (100 / slider3.max);
    color = 'linear-gradient(90deg, rgb(255,208,20)' + x + '% , rgb(214, 214, 214)' + x + '%)';
    slider3.style.background = color;

    calcAndUpdate();
});

/*SLIDER 4 = Skuggning

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

*/

//SLIDER 5 = Husvärdeökning

slider5.addEventListener('input', function () {

    var factorHouseValueIncrease = 0.08 // standard 0.14, 0.08 as sad case

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

slider6.addEventListener('input', function () {
    var input = slider6.value;
    document.getElementById('value6').innerHTML = input;

    interestRate = input

    var x = input * (100 / slider6.max);
    color = 'linear-gradient(90deg, rgb(255, 215, 56)' + x + '% , rgb(214, 214, 214)' + x + '%)';
    slider6.style.background = color;

    calcAndUpdate();

});

//SLIDER 7 = Lånets löptid

slider7.addEventListener('input', function () {
    var input = slider7.value;
    document.getElementById('value7').innerHTML = input;

    loanPeriod = input


    var x = input * (100 / slider7.max);
    color = 'linear-gradient(90deg, rgb(255, 215, 56)' + x + '% , rgb(214, 214, 214)' + x + '%)';
    slider7.style.background = color;

    calcAndUpdate();

});



// FUNCTIONS

function calcAndUpdate() {

    calculateSavings(squareMeter, kWhCost);

    monthlySavings = yearlySavings / 12
    yearlySavings = yearlySavings.toFixed(0)
    monthlySavings = monthlySavings.toFixed(0)

    paybackTime = (squareMeter * avgPricePerSQM) / yearlySavings // removed shadowcoefficient of 0.9

    percentageROI = 1 / paybackTime * 100

    calcTotalPrice(squareMeter);

    calcMonthlyLoanCost(totalProjectPrice, interestRate, loanPeriod)

    monthlyNet = monthlySavings - monthlyLoanCost

    loanTotalCost = monthlyNet * loanPeriod * 12

    document.getElementById('totalProjectPrice').textContent = numberWithSeparator(totalProjectPrice)
    document.getElementById('yearlySavings').textContent = numberWithSeparator(yearlySavings)
    document.getElementById('monthlySavings').textContent = numberWithSeparator(monthlySavings)
    document.getElementById('paybackTime').textContent = paybackTime.toFixed(1)
    document.getElementById('percentageROI').textContent = percentageROI.toFixed(1)
    document.getElementById('monthlyLoanCost').textContent = numberWithSeparator(monthlyLoanCost.toFixed(0))
    document.getElementById('monthlySaving2').textContent = numberWithSeparator(monthlySavings)
    document.getElementById('monthlyNet').textContent = numberWithSeparator(monthlyNet.toFixed(0))
    document.getElementById('loanTotalCost').textContent = numberWithSeparator(loanTotalCost.toFixed(0))
    document.getElementById('valueIncrease').textContent = numberWithSeparator(houseValueIncrease.toFixed(0))

    document.getElementById('table-loan-content').innerHTML = ""
    document.getElementById('table-purchase-content').innerHTML = ""
}

// Generating loan and purchase tables
showTableButton.addEventListener('click', function () {
    if (document.getElementById('table-loan-content').innerHTML == "" && document.getElementById('table-purchase-content').innerHTML == "") {
        generateTables();
    }
})





// Calculate totalProjectPrice

function calcTotalPrice(squareMeter) {
    totalProjectPrice = squareMeter * avgPricePerSQM
    return totalProjectPrice
}
function calculateSavings(squareMeter, kWhCost) {
    //Calculating totalSavings per year
    yearlySavings = squareMeter * kWhCost * sunRadiance * losses * panelEfficiency
    return yearlySavings;
}
function calcMonthlyLoanCost(lånebelopp, årsränta, antalÅr) {

    var annuitet, lånebelopp, årsränta, månadsränta, antalÅr, antalÅterbetalningar, a

    månadsränta = årsränta / 12 * 0.01
    antalÅterbetalningar = antalÅr * 12

    a = ((1 + månadsränta) ** antalÅterbetalningar)
    annuitet = lånebelopp * ((månadsränta * a) / (a - 1))

    monthlyLoanCost = annuitet
    return monthlyLoanCost

}
// Fixing thousand separator
function numberWithSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


////// END OF MAIN SHIT

/// Generating tables

var loanTableArray = []
var purchaseTableArray = []

function generateTables() {

    generatePurchaseTables();
    generateLoanTables();

    displayLoanTable(loanTableArray);
    displayPurchaseTable(purchaseTableArray);

    buildGraphs();
}
function generatePurchaseTables() {
    purchaseTableArray = [];

    function PurchaseObject(a, b, c, d) {
        this.år = a;
        this.intjänatÅr = b;
        this.ackIntjänat = c;
        this.total = d;
    }
    for (var i = 1; i <= paybackTime + 1; i++) {

        var object = new PurchaseObject(
            i,
            Math.round(yearlySavings),
            Math.round(i * yearlySavings),
            Math.round((i * yearlySavings - totalProjectPrice)));

        purchaseTableArray.push(object)
    }
}

function generateLoanTables() {
    loanTableArray = [];

    function LoanObject(a, b, c, d, e) {
        this.månad = a;
        this.lånkostnad = b;
        this.intjänat = c;
        this.netto = d;
        this.total = e;
    }
    if (loanPeriod != 0) {
        for (var i = 1; i <= loanPeriod; i++) {

            var object = new LoanObject(
                i,
                Math.round(i * monthlyLoanCost * 12),
                i * yearlySavings,
                Math.round(monthlyNet * 12),
                Math.round(i * monthlyNet * 12));

            loanTableArray.push(object)
        }
    } else {
        loanTableArray = []
    }

}

function displayLoanTable(data) {

    for (var i = 0; i < data.length; i++) {
        var row = `<tr>
                    <td class="table-cell" style="text-align: center;">${loanTableArray[i].månad} </td>
                    <td class="table-cell" style="text-align: center;">${loanTableArray[i].lånkostnad}  </td>
                    <td class="table-cell" style="text-align: center;">${loanTableArray[i].intjänat}  </td>
                    <td class="table-cell" style="text-align: center;">${loanTableArray[i].netto}  </td>
                    <td class="table-cell" style="text-align: right;">${loanTableArray[i].total} SEK </td>
                </tr>`
        document.getElementById('table-loan-content').innerHTML += row
    }
}

function displayPurchaseTable(data) {

    for (var i = 0; i < paybackTime; i++) {
        var row = `<tr>
                    <td class="table-cell" style="text-align: center;">${purchaseTableArray[i].år} </td>
                    <td class="table-cell" style="text-align: center;">${purchaseTableArray[i].intjänatÅr}  </td>
                    <td class="table-cell" style="text-align: center;">${purchaseTableArray[i].ackIntjänat}  </td>
                    <td class="table-cell" style="text-align: right;">${purchaseTableArray[i].total} SEK </td>
                </tr>`
        document.getElementById('table-purchase-content').innerHTML += row
    }
}


// Building graph

// generate an array of the same years as the payback time to match the label 

var loanDataArray = []
var purchaseDataArray = []
var withValueIncreaseDataArray = []


function generateDataArrays() {
    loanDataArray = []
    purchaseDataArray = []
    withValueIncreaseDataArray = []

    for (var i = 1; i <= 30; i++) {

        purchaseDataArray.push(i * yearlySavings - totalProjectPrice)
        withValueIncreaseDataArray.push(houseValueIncrease + i * yearlySavings - totalProjectPrice)

        if (i < loanPeriod) {
            loanDataArray.push(i * monthlyNet * 12)
            console.log(i)
        } else {
            loanDataArray.push(loanPeriod * monthlyNet * 12 + (i - loanPeriod) * yearlySavings)
            console.log(i - loanPeriod)
        }

    }
}

// connect the data of the XXXtableArray to the graph

function buildGraphs() {

    generateDataArrays();

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
            datasets: [{
                label: 'Direktköp',
                data: purchaseDataArray,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            },
            {
                label: 'Direktköp m. husvärdeökning',
                data: withValueIncreaseDataArray,
                backgroundColor: [
                    'rgba(200, 150, 132, 0.5)'
                ],
                borderColor: [
                    'rgba(200, 150, 132, 1)'
                ],
                borderWidth: 1
            },
            {
                label: 'Vid Lån',
                data: loanDataArray,
                backgroundColor: [
                    'rgba(156, 99, 132, 0.5)'
                ],
                borderColor: [
                    'rgba(156, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });


}










/*

//                          p(1+p)^antalåterbetalningar
// Annuitet = lånebelopp * ----------------------------
//                         (1+p)^antalåterbetalningar - 1


console.log('squareMeter: ' + squareMeter)
console.log('shadowCoefficient: ' + shadowCoefficient)
console.log('avgPricePerSQM: ' + avgPricePerSQM)
console.log('houseValueIncrease: ' + houseValueIncrease)
console.log('yearlySavings = ' +  yearlySavings)
console.log('monthlySavings = ' + monthlySavings)
console.log('paybackTime = ' + paybackTime)
console.log('percentageROI = ' + percentageROI)
console.log('monthlyLoanCost = ' + monthlyLoanCost)


*/
