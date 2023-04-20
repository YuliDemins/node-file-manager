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
import { getHash } from './getHash.js';
import { compressFile, decompressFile } from './compressFile.js';

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
    if (data.startsWith('hash')) {
      const file = data.split(' ').slice(1).join('');
      getHash(DIR, file);
    }
    if (data.startsWith('.exit')) {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      rl.close();
    }
    if (data.startsWith('compress')) {
      const filePath = data.split(' ').slice(1, 2).join('');
      const fileDestination = data.split(' ').slice(2).join('');
      compressFile(DIR, filePath, fileDestination);
    }
    if (data.startsWith('decompress')) {
      const filePath = data.split(' ').slice(1, 2).join('');
      const fileDestination = data.split(' ').slice(2).join('');
      decompressFile(DIR, filePath, fileDestination);
    }
    else {
    console.log(`Invalid input`);
    }
  });
};

Enter();


