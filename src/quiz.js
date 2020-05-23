'use strict';

const write = s => process.stdout.write(s);
const clearScreen = () => write('\x1Bc');


const path = require('path').resolve(__dirname, './quiz.json');

const file = require('fs').readFileSync(path, 'utf8');

const questions = JSON.parse(file);

let index = 0;

const questionSelector = () => {

  if (index === questions.length) {
    clearScreen();
    process.exit(0);
  }

  clearScreen();

  const curQ = questions[index];

  write(`\n\t${index + 1}. ${curQ.q}`);

  Object.keys(curQ.ans).forEach(a => {
    write(`\n\t${a}) ${curQ.ans[a]}`);
  });

  write('\x1b[20;10H');

  write(`
                          ┌────────────────────────────┐
                          │ Відповідь:                 │
                          └────────────────────────────┘
  `);

  write('\x1b[2A\x1b[37C');
};

const questionReacting = data => {
  const react = (questions[index++].cor === data) ? 'Nice' : 'Bad';
  clearScreen();
  write(`\n\t${react}`);
};

questionSelector();


process.stdin.on('data', chunk => {
  questionReacting(chunk.toString().trim());
  setTimeout(questionSelector, 2000);
});
