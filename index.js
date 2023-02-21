const process =  require('process');
const { calcChange } = require('./calc-change.js');

const { itemCost, payment, helpFlag } = calcChange(process.argv);
