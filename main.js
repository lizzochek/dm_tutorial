'use strict'

const fs = require("fs");
const child_process = require('child_process');

const childDocViewer = child_process.spawn('node', ['./lib/doc_viewer.js'],
  { shell: true });
const childQuizViewer = child_process.spawn('node', ['./quiz.js'],
  { shell: true });



function childProcessor(isQuiz) {

  const way = (isQuiz) ? './lib/quiz.js' : './lib/doc_viewer.js';
  const child = child_process.spawn('node', [way],
  { shell: true });

  child.stdout.on('data', data => {
    process.stdout.write(data);
  });

  process.stdin.on('data', data => {
    child.stdin.write(`${data}\n`);
  });

  child.on('close', (code) => {
    removeEventListener(process.stdin);
  });
}

const path = require('path').resolve(__dirname, './progress.json');
const file = require('fs').readFileSync(path, 'utf8');
const progress = JSON.parse(file);

function show(arr) {
  for (let obj of arr) {
    fs.writeFileSync('./lib/current_path.txt', obj.path);
    if (obj.progress === "false") {
      obj.progress = true;
      if (!obj.isQuiz) {
        childProcessor(false);
      } else childProcessor(true);
    }
  }
}

show(progress);
