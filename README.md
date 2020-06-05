# dm_tutorial

The program is designed for learning the basics of discrete maths.

[Русская версия](https://github.com/lizzochek/dm_tutorial/blob/master/README_RU.md)

# Usage

In order to open the program go to `$PATH/dm_tutorial`, where `$PATH` — path
to the dm_tutorial directory. Then write 
```bash
$ node main.js
```
You will see the introduction. To scroll press `Enter`. To go back to the beginning
write `begin` and press `Enter`.
After finishing the introduction you will be shown lectures and quizes one by one.
To answer the quiz question simply write the letter you think is right and press `Enter`. 
You will be shown the right answer as soon as you give yours. Wait a few seconds for 
the next question to appear.

To exit press `Ctrl+C`. The next time you open the program you will be shown the lecture 
of quiz you you haven't passed yet.

## Starting a lecture again

If you want to start from the lecture you previously tried to complete  go to `$PATH/dm_tutorial`,
 where `$PATH` — path to the dm_tutorial directory. Then write 
```bash
$ node lecture_selector.js
```
Then follow the given instructions
