'use strict';

const fs = require('fs');
const progress = require('./progress.json');

progress.forEach(obj => obj.progress = false);

fs.writeFileSync('./progress.json', JSON.stringify(progress));
console.log('Your progress was discarded successfully');