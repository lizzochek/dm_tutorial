'use strict'

process.stdin.setRawMode(true);

process.stdin.on('data', data => {
    const key = data[0];
    console.dir(data);
    if (key === 3) { //Ctrl+C
      process.exit(0);
    }
  });