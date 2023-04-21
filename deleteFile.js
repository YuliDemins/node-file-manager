import fs from 'fs/promises';
import { absolutePath } from './cdDir.js';

export const deleteFile = (dir, file) => {
  if (!file) {
    console.log('Invalid input');
  }
  else {
    const filePath = absolutePath(dir, file);
    
    fs.rm(filePath)
      .then(() => console.log('Success'))
      .catch((err) => console.log('FS operation failed'));
  }

};
