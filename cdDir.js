import os from 'os';
import path from 'path';
import fs from 'fs';

let DIR = os.homedir();

export const absolutePath = (dir, file) => path.isAbsolute(file) ? file : path.join(dir, file);

export const cdDir = (dir, file) => {
  if (!file) {
    console.log('Invalid input');
    return DIR;
  }
  else {
    DIR = absolutePath(dir, file);
    if (fs.existsSync(DIR)) {
        console.log(`You are currently in ${DIR}`);
        return DIR;
    }
    else {
      console.log('FS operation is failed')
      
    }
  }
};

