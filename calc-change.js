/**
 * This function parses the command line arguments array to locate the --item-cost and --payment flags.
 * If the flags are not found, or there is another issue parsing the arguments, this function will exit
 * with an error message.
 * @param { Array<string> } argv is an array taken off of the process object in the command line and is 
 * passed to this function.
 * @returns { itemCost: number, payment: number } an object that includes original values as well as outputs 
 * the amount of change due.  
 */

function calcChange(argv) {

  let helpFlag = '--help';
  let itemCost = '--item-cost';
  let payment = '--payment';

  for (let i = 0; i < argv.length; ++i) {
        
    if (argv[i] === itemCost) {
      itemCost = argv[i + 1];
      ++i;
    }
    
    if (argv[i] === payment) {
      payment = argv[i + 1];
      ++i;
    }

    if (argv[i] === helpFlag) {

      return console.log('This command line interface program takes the following flags: --item-cost (followed by the numeral cost of the item you want to purchase), and --payment (followed by the numeral amount you will tender for the item you wish to purchase). In response, you will be provided the amount of money that should be returned to you as change, including the number of dollars, quarters, dimes, nickels and pennies. Thank you for using command line change!');
    };
  };

  const cost = new Number(itemCost);

  if (cost == null & !helpFlag) {
    console.error('Must provide --item-cost');
    process.exit(1);
  }

  if (isNaN(cost) & !helpFlag) {
    console.error('--item-cost must be a number');
    process.exit(1);
  }

  const paid = new Number(payment);

  if (paid == null & !helpFlag) {
    console.error('Must provide --payment');
    process.exit(1);
  }

  if (isNaN(paid) & !helpFlag) {
    console.error('--payment must be a number');
    process.exit(1);
  }
  

  let change = (paid - cost); // initial change amount
  let changeInteger = Math.floor(change); // real change rounded down to whole number
  let coinChange = change - changeInteger; // coinage to calculate number of each denomination
  let twoDecimals = coinChange.toFixed(2); // stop any fractional numbers at two decimal places
  let changeAmount = Number(twoDecimals); // ensure type persistence
  const realChangeAmount = changeInteger + changeAmount; // total change amount
  let amountPaid = paid.toString(); // type conversion for payment to string
  console.log('Cost: $' + cost);
  console.log('Payment: $' + amountPaid);
  let calcAmt = Math.ceil(changeAmount * 100); // convert decimal amount to integer
  
    if (calcAmt === 0) {
      return console.log('No change calculations needed. Change amount is $0.');
    };
  console.log('Dollars: ', changeInteger);
     while (calcAmt >= 25) {
      const quarters = Math.floor(calcAmt / 25);
      calcAmt = calcAmt % 25;
      console.log('Quarters: ', quarters);
     };
     
      while (calcAmt >= 10) {
      const dimes = Math.floor(calcAmt / 10);
      calcAmt = calcAmt % 10;
      console.log('Dimes: ', dimes);
      };

      while (calcAmt >= 5) {
      const nickels = Math.floor(calcAmt / 5);
      calcAmt = calcAmt % 5;
      console.log('Nickels: ', nickels);
      };

      while (calcAmt >= 1) {
      const pennies = Math.floor(calcAmt / 1);
      console.log('Pennies: ', pennies);
      };
      
      console.log('Change due: $' + realChangeAmount);
    
  return {
    itemCost,
    payment,
    helpFlag
  }
}

module.exports = { calcChange };
