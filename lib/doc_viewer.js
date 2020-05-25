'use strict'

process.stdin.setRawMode(true);

const path = require('path').resolve(__dirname, lecture);
const file = require('fs')
  .readFileSync(path, 'utf8')
  .toString()
  .split('\n');

const write = s => process.stdout.write(s);
const clearScreen = () => write('\x1Bc');

let firstLine = 0, lastLine = 23;

const info = isEnd => {
  if (!isEnd)
    write(`:\u001b[30m\u001b[47mLINES ${firstLine}-${lastLine}`);
  else
    write(`:\u001b[30m\u001b[47mEND [TO EXIT PRESS ENTER]`);
};

const showContents = isEnd => {
  clearScreen();
  for (let i = firstLine; i < lastLine; i++)
    write(`${file[i]}\n`);
  info(isEnd);
};

const scroll = data => {
  const key = data[0];
  if (data.length === 3) {
    const secKey = data[1];
    const lastKey = data[2];
    if (key === 27 && secKey === 91) {
      if (lastKey === 65) {
        if (firstLine > 0) {
          --firstLine;
          --lastLine;
          showContents(false);
        }
      }
      if (lastKey === 66) {
        if (lastLine < file.length - 1) {
          ++firstLine;
          ++lastLine;
          showContents(false);
        } else
          showContents(true);
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
