'use strict'

const fs = require("fs");
const child_process = require('child_process');

function childProcessor(isQuiz) {

  const way = (isQuiz) ? './lib/quiz.js' : './lib/doc_viewer.js';
  let child = child_process.spawn('node', [way],
    { shell: true });

  child.stdout.on('data', data => {
    process.stdout.write(data);
  });

  process.stdin.on('data', data => {
    child.stdin.write(`${data}\n`);
  });

  child.on('close', (code) => {
    process.stdin.removeAllListeners('data');
    process.stdout.removeAllListeners('data');
    fs.writeFileSync('./progress.json', JSON.stringify(progress));
    increment();
  });
}

const path = require('path').resolve(__dirname, './progress.json');
const file = require('fs').readFileSync(path, 'utf8');
const progress = JSON.parse(file);

const getFullPath = path =>
  require('path').resolve(__dirname, path);

let index;

for (let j = 0; j < progress.length; j++) {
  if (!progress[j].progress) {
    index = j;
    break;
  }
}

function increment() {
  if (index < progress.length) {
    progress[index].progress = true;
    let obj = progress[index];
    let fullPath = getFullPath(obj.path);
    fs.writeFileSync('./lib/current_path.txt', fullPath);
    childProcessor(obj.isQuiz);
    index++;
  }
}
increment();