import fs from 'fs';
import crypto from 'crypto';
import { absolutePath } from './cdDir.js';

export const getHash = (dir, file) => {
  if (!file) {
    console.log('Invalid input');
  }
  else {
    fs.readFile(absolutePath(dir, file), (error, data) => {
      if (error) {
        console.log('FS operation failed');
      }
      else {
        const hash = crypto.createHash('sha256').update(data).digest('hex');
        console.log(hash);
      }
    })
  }
};