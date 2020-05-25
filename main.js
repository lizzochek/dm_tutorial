'use strict'

const child_process = require('child_process');

const child = child_process.spawn('less', ['./lib/quiz.js'],
 { shell: true });

child.stdout.on('data', data => {
  process.stdout.write(data);
});

process.stdin.on('data', data => {
  child.stdin.write(`${data}\n`);
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
  process.exit(0);
});