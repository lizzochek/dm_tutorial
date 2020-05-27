'use strict';

const getFullPath = path =>
  require('path').resolve(__dirname, path);

const path = require('fs')
  .readFileSync(getFullPath('./current_path.txt'), 'utf8')
  .toString();

const file = require('fs')
  .readFileSync(path, 'utf8')
  .toString()
  .split('\n');

const write = s => process.stdout.write(s);
const clearScreen = () => write('\x1Bc');

let firstLine = 0, lastLine = 23;

const info = () =>
  write(':\u001b[30m\u001b[47m[TO SHOW BEGGINING ENTER \'begin\'] >');

const showContents = () => {
  for (let i = firstLine; i < lastLine; i++)
    write(`${file[i]}\n`);
  info();
};

const scroll = data => {
  if (data === 'begin') {
    clearScreen();
    firstLine = 0;
    lastLine = 23;
    showContents();
  } else if (lastLine < file.length) {
    clearScreen();
    ++firstLine;
    ++lastLine;
    showContents();
  } else {
    clearScreen();
    process.exit(0);
  }
};

showContents();

process.stdin.on('data', data => {
  scroll(data.toString().trim());
});
