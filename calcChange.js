/**
 * This function parses the command line arguments array to locate the --item-cost and --payment flags.
 * If the flags are not found, or there is another issue parsing the arguments, this function will exit
 * with an error message.
 * @param {Array<string>} argv is an array taken off of the process object in the command line and is 
 * passed to this function.
 * @returns {Object} an object that includes the item-cost and payment values as well as the amount of 
 * change due.  
 */
function calcChange(argv) {
  console.log('argv', argv);
  /** Create two variables assigned no value.  We will need them shortly  */
  let itemCost = null;
  let payment = null;
  
/** 
 * When the loop arrives at a data type that matches the string '--item-cost' exactly, reassign the variable 
 * itemCost to the value of the item that FOLLOWS the identified match.  Repeat the same process for the string 
 * 'payment'.  
 */

  for (let i = 0; i < argv.length; ++i) {
    if (argv[i] === '--item-cost') {
      itemCost = argv[i + 1];
      ++i;
    }
    if (process.argv[i] === '--payment') {
      payment = process.argv[i + 1];
      ++i;
    }
  }
/**
 * Wrap the variable itemCost in a 'new Number()' object and assign the variable cost to that object.
 */
  const cost = new Number(itemCost);

/** 
 * Error handling: Check that there is a value assigned to cost.  If there is not, inform the user and exit the 
 * program with a status code of 1.
 */

  if (cost == null) {
    console.error('Must provide --item-cost');
    process.exit(1);
  }

  if (isNaN(cost)) {
    console.error('itemCost must be a number');
    process.exit(1);
  }

 /** 
 * Wrap the value of payment in a 'new Number()' object and assign the variable pay to that object 
 */

  const pay = new Number(payment);

/** 
 * Error handling: Check that there is a value assigned to pay.  If there is not, inform the user and exit the
 * program with a status code of 1.  
 */

  if (pay == null) {
    console.error('Must provide --payment');
    process.exit(1);
  }

/** 
 * It is not just extra helpful to log the values to the console.  It is vital.  It is entering a room you have 
 * never seen before, at night, and turning on the light before walking through it instead of cutting and bruising 
 * your shins and knees up, stubbing your toes, trying to find the way through it in the darkness. So double check the values that we are working with for each variable.
 */

  console.log('item-cost', itemCost);
  console.log('payment', payment);

/** 
 * Calculate the total value of the amount that will be due back to the user by subtracting the cost variable from 
 * the pay variable, and then assign the resulting value to the variable change. 
 */

  let change = (pay - cost);

/** 
 * Peel off the decimal value from any whole integers... to be continued.
 */

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
      const quarters = Math.floor(calcAmt / 25);
      console.log('Quarters: ', quarters);
      // Use the modulus operator to get the remainder of the division.
      calcAmt = calcAmt % 25;
    // Do the same for the other denominations.
    case calcAmt >= 10:
      const dimes = Math.floor(calcAmt / 10);
      console.log('Dimes: ', dimes);
      calcAmt = calcAmt % 10;
    case calcAmt >= 5:
      const nickels = Math.floor(calcAmt / 5);
      console.log('Nickels: ', nickels);
      calcAmt = calcAmt % 5;
    case calcAmt >= 1:
      console.log('Pennies: ', calcAmt);
    default:
      console.log('Thank you for using Keep the Change. Your change is $' + change + '.');
  }
}
