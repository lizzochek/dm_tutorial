'use strict';

const fs = require('fs');
const write = s => process.stdout.write(s);
const clearScreen = () => write('\x1Bc');

const path = require('path').resolve(__dirname, './progress.json');
const file = require('fs').readFileSync(path, 'utf8');
const progress = JSON.parse(file);

const discardAsk = () => {
  clearScreen();
  write(`\n\tВведіть шифр лекції, з якої ви хотіли б почати з даного списку:
    Ввідна лекція - 0 
    Лекція 1.1 - 2
    Лекція 1.2 - 4
    Лекція 1.3 - 6
    Лекція 1.4 - 8
    Лекція 1.5 - 10
    Лекція 1.6 - 12
    Лекція 1.7 - 14
    Лекція 1.8 - 16
    Лекція 1.9 - 18
    Лекція 1.10 - 20
    Лекція 1.11 - 22
    Лекція 1.12 - 24
    Лекція 1.13 - 26
    Для виконання тесту до лекції, введіть: шифр лекції + 1;
    \t\n`);

  write('\x1b[18;10H');

  write(`
                          ┌────────────────────────────┐
                          │ Відповідь:                 │
                          └────────────────────────────┘

  `);
  write('\x1b[3A\x1b[37C');
};

const Reacting = data => {
  data = parseInt(data, 10);
  let react;
  if (Number.isNaN(data)) react = 'Будь ласка, введіть цифру зі списку\n';
  else {
    if (data === 0) progress.forEach(obj => obj.progress = false);
    else {
      for (let i = data; i < progress.length; i++) {
        progress[i] = false;
      }
    }
    react = 'При наступному запуску програми відкриється обрана вами лекція\n';
  }
  fs.writeFileSync('./progress.json', JSON.stringify(progress));
  clearScreen();
  write(`\n\t${react}`);
  setTimeout(() => process.exit(0), 2000);
};

discardAsk();

process.stdin.on('data', chunk => {
  Reacting(chunk.toString().trim());
});
