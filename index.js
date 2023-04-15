import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname, sep } from 'path';
import process from 'process';
import readline from 'readline';
import os from 'os';

import { upDir } from './upDir.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const username = args.join('').split('=')[1];

console.log(`Welcome to the File Manager, ${username}!`)
console.log(`You are currently in ${os.homedir()}`)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Enter = () => {
  rl.on('line', (data) => {
    if (data.startsWith('up')) {
      upDir();
    }
    if (data.startsWith('cd')) {
      console.log(data.split(' ').slice(1));
    }
    if (data.startsWith('cat')) {
      console.log(data);
    }
    if (data.startsWith('exit')) {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      rl.close();
    }
    // else {
    // console.log(`Вы ввели: ${data}`);
    // Enter();
    // }
  });
};

Enter();

const folderPath = 'C:/Users/Julia/Desktop/Project'; // замените на ваш путь к папке
const dir = 'Nodejs'; // замените на ваше имя файла

// fs.readdir(__dirname, (err, data) => {
//   if (err) throw err;
//   console.table(data);
// })
// console.log(path.parse(os.homedir()).root.slice(0, -1))
// console.log(os.homedir().split(sep).slice(0,-2).join(sep) == path.parse(os.homedir()).root.slice(0, -1))
// console.log(__dirname.split(sep))

// process.chdir(path.dirname(path.resolve('.')));
