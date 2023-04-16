import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname, sep } from 'path';
import process from 'process';
import readline from 'readline';
import os from 'os';

import { upDir, cdDir } from './cdDir.js';
import { showInfoDir } from './showInfoDir.js';
import { readFile } from './readFile.js';
import { createFile } from './createFile.js';
import { renameFile } from './renameFile.js';
import { deleteFile } from './deleteFile.js';
import { getInfoOs } from './system.js';

let DIR = os.homedir();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const username = args.join('').split('=')[1];

console.log(`Welcome to the File Manager, ${username}!`)
console.log(`You are currently in ${DIR}`)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Enter = () => {
  rl.on('line', (data) => {
    if (data.startsWith('up')) {
      DIR = upDir(DIR);
    }
    if (data.startsWith('cd')) {
      const file = data.split(' ').slice(1).join('');
      DIR = cdDir(DIR, file);
    }
    if (data.startsWith('ls')) {
      showInfoDir(DIR);
    }
    if (data.startsWith('cat')) {
      const file = data.split(' ').slice(1).join('');
      readFile(DIR, file)
    }
    if (data.startsWith('add')) {
      const file = data.split(' ').slice(1).join('');
      createFile(DIR, file);
    }
    if (data.startsWith('rn')) {
      const filePath = data.split(' ').slice(1, 2).join('');
      const file = data.split(' ').slice(2).join('');
      DIR = renameFile(DIR, filePath, file);
    }
    if (data.startsWith('rm')) {
      const file = data.split(' ').slice(1).join('');
      deleteFile(DIR, file);
    }
    if (data.startsWith('os')) {
      const file = data.split(' ').slice(1).join('');
      getInfoOs(file);
    }
    if (data.startsWith('.exit')) {
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

const rootPath = 'C:/Users/Julia/';
const folderPath = 'C:/Users/Julia/Desktop';
const dir = 'Nodejs';

// const arrDisk = [ 'C:' , 'D:']
// const file = 'C:'
// console.log(file)
// if (arrDisk.includes(file)){
//   // process.chdir(file[2]);
//   console.log(`You are currently in ${file}`);
// }

