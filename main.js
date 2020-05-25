'use strict'

const child_process = require('child_process');

const childDocViewer = child_process.spawn('node', ['./lib/doc_viewer.js'],
 { shell: true });
 const childQuizViewer = child_process.spawn('node', ['./quiz.js'],
 { shell: true });

 childDocViewer.stdout.on('data', data => {
  process.stdout.write(data);
});

process.stdin.on('data', data => {
  childDocViewer.stdin.write(`${data}\n`);
});

childDocViewer.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
  process.exit(0);
});