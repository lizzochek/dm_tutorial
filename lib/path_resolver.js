'use strict'


const { resolve } = require('path');
const getFullPath = (cwd, path) => resolve(cwd, path);

const path = require('fs')
  .readFileSync(getFullPath(__dirname, './current_path.txt'), 'utf8')
  .toString()

module.exports = {
  path,
  getFullPath,
}