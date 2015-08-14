
'use strict'
// declare global variables if any
  var hrArray = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
                 '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
                 '5:00 PM', '6:00 PM'];
// creating constructor
  var DonutShop = function(locationName, minCus, maxCus, avgDon) {
    this.locationName = locationName;
    this.minCus = minCus;
    this.maxCus = maxCus;
    this.avgDon = avgDon;
    this.perHour = null;
    this.total = 0;
    this.row = null;
  }
  // method for generating a random number of customers
  DonutShop.prototype.randomCus = function(minCus, maxCus) {
    return Math.floor(Math.random() * (maxCus - minCus + 1)) + minCus;
  }
  
  // method for calculating simulated amounts of donuts per hour
  DonutShop.prototype.donPerHour = function() {
    return Math.round(this.avgDon * this.randomCus(this.minCus, this.maxCus));
  }
    
  // method for calculating the sum of hourly totals
  DonutShop.prototype.sumHrTotal = function() {
    this.total = 0;
    this.perHour = [];
    for (var i = 0; i < hrArray.length; i++) {
      this.perHour[i] = this.donPerHour();
      this.total += this.perHour[i];
    }
    return this.total;
  }
  
  // method to add new row into table
  DonutShop.prototype.addRow = function(donutTable) {
    this.row = donutTable.insertRow(-1);
    this.updateRow();
  }
    
    // method to update row
  DonutShop.prototype.updateRow = function() {
    this.row.innerHTML = '';
    this.row.insertCell(-1).innerHTML = this.locationName;
    
    // loop over this.perHour
    for (var i = 0; i < this.perHour.length; i++) {
      var cell = this.row.insertCell(-1);
      cell.innerHTML = this.perHour[i];
    }
  }

// new instances
var downtown = new DonutShop("Downtown", 8, 43, 4.50);
var capitolHill = new DonutShop("Capitol Hill", 4, 37, 2.00);
var southLakeUnion = new DonutShop("South Lake Union", 9, 23, 6.33);
var wedgewood = new DonutShop("Wedgewood", 2, 28, 1.25);
var ballard = new DonutShop("Ballard", 8, 58, 3.75);

downtown.sumHrTotal();
capitolHill.sumHrTotal();
southLakeUnion.sumHrTotal();
wedgewood.sumHrTotal();
ballard.sumHrTotal();


// DOM access 
var donutTable = document.getElementById('donut-shops');
var row = donutTable.insertRow(0);
row.insertCell(-1);
for (var i = 0; i < hrArray.length; i++) {
  row.insertCell(-1).innerHTML = hrArray[i];
}
downtown.addRow(donutTable);
capitolHill.addRow(donutTable);
southLakeUnion.addRow(donutTable);
wedgewood.addRow(donutTable);
ballard.addRow(donutTable);

// input form and button

var donuts = document.getElementById('donuts');
var donutForm = document.getElementById('donut-form');
var donutButton = document.getElementById('donut-button');
var donutData = [downtown, capitolHill, southLakeUnion, wedgewood, ballard];
  
// button tag that saves location in following manner
// instantiate a new DonutShop object with user supplied input tags
// append a row to the table using the new object's hourly and daily
// using the same HTML elements, update existing location tip: use an array
// to hold DonutShop objects

var handleDonutSubmit = function(event) { // function that handles the event
  event.preventDefault(); // prevents the page from refreshing
  var locName = event.target['location-name'].value; // created variables for clarity
  var min = event.target['min-cus'].value;
  var max = event.target['max-cus'].value;
  var avg =  event.target['avg-don'].value;
  var isNewShop = true; 
  for (var i = 0; i < donutData.length; i++) { // loop through the array to detemine if the user put in a location to be updated or created a new one
    var shop = donutData[i];
    if (locName === shop.locationName) { // allows data to be changed based on user input
      isNewShop = false;
      shop.minCus = min; 
      shop.maxCus = max;
      shop.avgDon = avg;
      shop.sumHrTotal();
      shop.updateRow();
      break;
    }
  }
  if (isNewShop) { // new shop info
    var newShop = new DonutShop(locName, min, max, avg);
    newShop.sumHrTotal();   
    newShop.addRow(donutTable);
    donutData.push(newShop);
    
  }
    
  if (locName == 'Hill Valley') { // easter egg utilizing town in BTTF
    var doc = document.getElementById('docB');
    doc.innerHTML = 'GREAT SCOTT!!';
  
  }
    
};

// add event listener

donutForm.addEventListener('submit', handleDonutSubmit);
