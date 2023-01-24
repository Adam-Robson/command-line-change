const process =  require('process');

console.log('argv', process.argv);
// set the user inputs --item-cost & --payment to variables
let itemCost = null;
let payment = null;
// when the user input flag matches the item in the process array, 
// read the next index as the value for that flag
for (let i = 0; i < process.argv.length; ++i) {
  if (process.argv[i] === '--item-cost') {
    itemCost = process.argv[i + 1];
    ++i;
  }
  if (process.argv[i] === '--payment') {
    payment = process.argv[i + 1];
    ++i;
  }
}

const cost = new Number(itemCost);


// handle errors in input parameters
if (cost == null) {
  console.error('Must provide --itemCost');
  process.exit(1);
}

if (isNaN(cost)) {
  console.error('itemCost must be a number');
  process.exit(1);
}

const pay = new Number(payment);
if (pay == null) {
  console.error('Must provide --payment');
  process.exit(1);
}


// double check the value we are working with for each variable
console.log('item-cost', itemCost); 
// console.log('cost', cost); 
console.log('payment', payment);
// console.log('pay', pay);

// Calculate the total change that will be due.
let change = (pay - cost);
console.log('change', change);

// Peel off the decimal to get the cents.
let changeDue = change - Math.floor(change);
// console.log('changeDue', changeDue);

// Convert the decimal to whole number representing cents.
let calcAmt = Math.ceil(changeDue * 100);
// console.log('calcAmt', calcAmt);


// Send calcAnmt to the switch statement if it is greater than 0.
switch (calcAmt >= 0) {
  case calcAmt === 0:
    console.log('No change.');
    break;
  // If calcAmt is greater than or equal to 25, divide by 25 to get the number of quarters.
  case calcAmt >= 25:
    const quarters = Math.floor(calcAmt / 25)
    console.log('Quarters: ', quarters);
  // Use the modulus operator to get the remainder of the division.
    calcAmt = calcAmt % 25;
  // Do the same for the other denominations.
  case calcAmt >= 10:
    const dimes = Math.floor(calcAmt / 10);
    console.log('Dimes: ', dimes);
    calcAmt = calcAmt % 10;
  case calcAmt >= 5:
    const nickels = Math.floor(calcAmt / 5)
    console.log('Nickels: ', nickels);
    calcAmt = calcAmt % 5;
  case calcAmt >= 1:
    console.log('Pennies: ', calcAmt)
  default:
    console.log('Thank you for using Keep the Change. Your change is $' + change + '.');
}
