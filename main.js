'use strict'

const showLecture = require('./lib/doc_viewer.js');
const showQuiz = require('./lib/quiz.js');

const path = require('path').resolve(__dirname, './progress.json');
const file = require('fs').readFileSync(path, 'utf8');
const progress = JSON.parse(file);

function show(arr) {
    for(let obj of arr) {
        console.log(obj);
        if(obj.progress === "false") {
            console.log(obj.progress);
            if(!obj.isQuiz) {
                await showLecture(obj.path);
                obj.progress = true;
            } else await showQuiz(obj.path);
        }
    }
}
show(progress);