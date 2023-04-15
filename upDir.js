import os from 'os';
import path, { dirname, sep } from 'path';
import fs from 'fs';


const makeArrDir = (filePath) => {
  let arrDir = filePath.split(sep);
  return arrDir;
}

const makeStringDirUp = (arr) => {
  let stringDir = arr.slice(0,-1).join(sep);
  return stringDir;
} 

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
    arr = arr.slice(0,-1);
    return DIR;
  }
}

export const downDir = (dir, file) => {
  DIR = path.resolve(dir, file);
  fs.access(DIR, (err) => {
    if (err) {
      console.log('FS operation failed');
      arr = makeArrDir(dir);
      return dir;
    } else {
      console.log(`You are currently in ${DIR}`);
      arr = makeArrDir(DIR);
      return DIR
    }
  });
}

export const cdDir = (dir, file) => {
  if (file == '..') {
    return upDir(dir);
  } else {
    return downDir(dir, file)
  }
}