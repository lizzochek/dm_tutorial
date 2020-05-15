'use strict';

process.stdin.setRawMode(true);

const path = require('path').resolve(__dirname, 'Semester\ 1/introduction/introductory_\ lection.txt');
const file = require('fs')
  .readFileSync(path, 'utf8')
  .toString()
  .split('\n');

const write = s => process.stdout.write(s);
const clearScreen = () => write('\x1Bc');

let firstLine = 0, lastLine = 23;

const info = () =>
  write(`:\u001b[30m\u001b[47mLINES ${firstLine}-${lastLine} [TO EXIT PRESS ENTER]`);

const showContents = () => {
  for (let i = firstLine; i < lastLine; i++)
    write(`${file[i]}\n`);
  info();
};

const scroll = data => {
  const key = data[0];
  if (data.length > 1) {
    const secKey = data[1];
    const lastKey = data[2];
    if (key === 27 && secKey === 91) {
      if (lastKey === 65) {
        if (firstLine > 0) {
          clearScreen();
          --firstLine;
          --lastLine;
          showContents();
        }
      }
      if (lastKey === 66) {
        if (lastLine < file.length) {
          clearScreen();
          ++firstLine;
          ++lastLine;
          showContents();
        }
      }
    }
  }
  if (key === 13 /* Enter */ || key === 3 /* Ctrl+C */) {
    clearScreen();
    process.exit(0);
  }
};

showContents();

process.stdin.on('data', data => {
  scroll(data);
});

