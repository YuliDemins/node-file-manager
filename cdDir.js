import os from 'os';
import path, { dirname, sep } from 'path';
import fs from 'fs';

const makeArrDir = (filePath) => {
  let arrDir = filePath.split(sep);
  return arrDir;
};

const makeStringDirUp = (arr) => {
  let stringDir = arr.slice(0, -1).join(sep);
  return stringDir;
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
    console.log(`You are currently in ${DIR}`);
    return DIR;
  } else {
    DIR = makeStringDirUp(arr);
    console.log(`You are currently in ${DIR}`);
    arr = arr.slice(0, -1);
    console.log(arr);
    return DIR;
  }
};

export const downDir = (dir, file) => {
  if(fs.existsSync(path.join(dir, file))) {
      DIR = path.join(dir, file);
      console.log(`You are currently in ${DIR}`);
      // arr = makeArrDir(DIR);
      return DIR;
  }
  else console.log('FS operation is failed')
};


export const cdDir = (dir, file) => {
  if (file == '..') {
    DIR = upDir(dir);
    return DIR;
  } 
  if (arrDisk.includes(file)){ //TODO проверить
    process.chdir(file);
    console.log(`You are currently in ${file}`);
  }
  else {
    DIR = downDir(DIR, file);
    return DIR
  }
};

