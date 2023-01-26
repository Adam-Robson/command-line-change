/**
 * This function parses the command line arguments array to locate the --item-cost and --payment flags.
 * If the flags are not found, or there is another issue parsing the arguments, this function will exit
 * with an error message.
 * @param { Array<string> } argv is an array taken off of the process object in the command line and is 
 * passed to this function.
 * @returns { itemCost: number, payment: number } an object that includes original values as well as outputs 
 * the amount of change due.  
 */

const calcChange = (argv) => {

  let itemCost = null;
  let payment = null;
  
/** 
 *  Reassign the variables itemCost and payment to the value of the item that FOLLOWS the identified match.  
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

  const cost = new Number(itemCost);
  

  /** Error handling */

  if (cost == null) {
    console.error('Must provide --item-cost');
    process.exit(1);
  }

  if (isNaN(cost)) {
    console.error('item-cost must be a number');
    process.exit(1);
  }

  const pay = new Number(payment);

  if (pay == null) {
    console.error('Must provide --payment');
    process.exit(1);
  }

  if (isNaN(pay)) {
    console.error('payment must be a number');
    process.exit(1);
  }

  let change = (pay - cost);

/**
 * Capture the integer portion of the change due.
 */

  let changeInteger = Math.floor(change);

/** Peel off the coinage */
  
  let coinChange = change - changeInteger;


  let twoDecimals = coinChange.toFixed(2);
  
  let changeAmount = Number(twoDecimals);
  

  const realChangeAmount = changeInteger + changeAmount;

  let amountPaid = pay.toString(); 

/** Calculate the number of each coin needed. */

  let calcAmt = Math.ceil(changeAmount * 100);
  switch (calcAmt >= 0) {
    case calcAmt === 0:
      console.log('No change.');
      break;
    case calcAmt >= 25:
      const quarters = Math.floor(calcAmt / 25);
      calcAmt = calcAmt % 25;
    case calcAmt >= 10:
      const dimes = Math.floor(calcAmt / 10);
      calcAmt = calcAmt % 10;
    case calcAmt >= 5:
      const nickels = Math.floor(calcAmt / 5);
      calcAmt = calcAmt % 5;
    case calcAmt >= 1:
      const pennies = Math.floor(calcAmt / 1);
    default:
      console.log('Dollars: ', changeInteger);
      console.log('Quarters: ', quarters);
      console.log('Dimes: ', dimes);
      console.log('Nickels: ', nickels);
      console.log('Pennies: ', pennies);
      console.log('Cost: $' + itemCost);
      console.log('Payment: $' + amountPaid);
      console.log('Change due: $' + realChangeAmount);
    }

/** Return the values established at the beginning of the function. */
  return {
    itemCost,
    payment
  }
}

module.exports = { calcChange }
