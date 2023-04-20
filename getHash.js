import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

export const getHash = (dir, file) => {
  fs.readFile(path.join(dir, file), (error, data) => {
    if (error) {
      console.log('FS operation failed');
    }
    else {
      const hash = crypto.createHash('sha256').update(data).digest('hex');
      console.log(hash);
    }
  })
};