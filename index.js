import process from 'process';
import readline from 'readline';
import os from 'os';

import { sendMessage } from './service.js';
import { cdDir } from './cdDir.js';
import { showInfoDir } from './showInfoDir.js';
import { readFile } from './readFile.js';
import { createFile } from './createFile.js';
import { renameFile } from './renameFile.js';
import { copyFile } from './copyFile.js';
import { moveFile } from './moveFile.js';
import { deleteFile } from './deleteFile.js';
import { getInfoOs } from './system.js';
import { getHash } from './getHash.js';
import { compressFile, decompressFile } from './compressFile.js';

let DIR = os.homedir();

let username = '';

const init = () => {
  const args = process.argv.slice(2);

  if (!args || !args.join('').startsWith('--username=')) username = 'unknown';
  else username = args.join('').split('=')[1];
  
  console.log(`Welcome to the File Manager, ${username}!`);
  sendMessage(DIR);
  // console.log(`You are currently in ${DIR}`)
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

init();

const commands = {
  'up': () => DIR = cdDir(DIR, '..'),
  'cd': (file) => DIR = cdDir(DIR, file),
  'ls': () => showInfoDir(DIR),
  'cat': (file) => readFile(DIR, file),
  'add': (file) => createFile(DIR, file),
  'rn': (filePath, file) => DIR = renameFile(DIR, filePath, file),
  'cp': (filePath, file) => copyFile(DIR, filePath, file),
  'mv': (filePath, file) => moveFile(DIR, filePath, file),
  'rm': (file) => deleteFile(DIR, file),
  'os': (file) => getInfoOs(file),
  'hash': (file) => getHash(DIR, file),
  'compress': (filePath, fileDestination) => compressFile(DIR, filePath, fileDestination),
  'decompress': (filePath, fileDestination) => decompressFile(DIR, filePath, fileDestination)
};

const Enter = () => {
  rl.on('line', (data) => {
    const [command, ...args] = data.split(' ');
    const cb = commands[command];
    if (cb) {
      cb(...args);
    }
    else if (command !== '.exit') {
      console.log('Invalid input');
    }
    else {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      rl.close();
    }
  });

  rl.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    rl.close();
  });
};

Enter();