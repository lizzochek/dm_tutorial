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
    increment(index);
  });
}

const path = require('path').resolve(__dirname, './progress.json');
const file = require('fs').readFileSync(path, 'utf8');
const progress = JSON.parse(file);

let index = 0;

function increment(index) {
  if(index < progress.legth) {
    let obj = progress[index];
    fs.writeFileSync('./lib/current_path.txt', obj.path);
    if(obj.isQuiz) {
      childProcessor(true);
    } else childProcessor(false);
    index++;
  }
}
increment();