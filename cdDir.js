import os from 'os';
import path, { sep } from 'path';
import fs from 'fs';

const makeArrDir = (filePath) => {
  return filePath.split(sep);
};

const makeStringDirUp = (arr) => {
  return arr.slice(0, -1).join(sep);
};

const getDisk = () => {
  const arrDisk = [];
  const rootDirectories = fs.readdirSync('/');

  for (const directory of rootDirectories) {
    if (directory.match(/^[A-Za-z]:$/i)) {
      arrDisk.push(directory);
    }
  }
  return arrDisk;
};

const arrDisk = getDisk()

let DIR = os.homedir();
let arr = makeArrDir(DIR);

export const upDir = (dir) => {
  if (arr.join(sep) == path.parse(DIR).root) {
    DIR = path.parse(dir).root;
  }
  else {
    DIR = makeStringDirUp(arr);
    arr = arr.slice(0, -1);
  }
  console.log(`You are currently in ${DIR}`);
  return DIR;
};

export const downDir = (dir, file) => {
  if (fs.existsSync(path.join(dir, file))) {
      DIR = path.join(dir, file);
      console.log(`You are currently in ${DIR}`);
      return DIR;
  }
  else {
    console.log('FS operation is failed')
    return DIR;
  }
};


export const cdDir = (dir, file) => {
  if (file == '..') {
    DIR = upDir(dir);
    return DIR;
  } 
  if (arrDisk.includes(file)){ //TODO проверить
    process.chdir(file);
    DIR = path.resolve(file);
    console.log(`You are currently in ${DIR}`);
  }
  else {
    DIR = downDir(DIR, file);
    return DIR
  }
};

