'use strict'


const { resolve } = require('path');
const getFullPath = path => resolve(__dirname, path);

const path = require('fs')
  .readFileSync(getFullPath('./current_path.txt'), 'utf8')
  .toString()

module.exports = {
    getFullPath,
    path,
}