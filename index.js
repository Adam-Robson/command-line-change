const process =  require('process');
const { calcChange } = require('./calcChange.js');

const { itemCost, payment } = calcChange(process.argv);
