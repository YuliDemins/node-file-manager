import fs from 'fs/promises';
import { absolutePath } from './cdDir.js';

export const deleteFile = (dir, file) => {
  const filePath = absolutePath(dir, file);
    
  fs.rm(filePath)
    .then(() => console.log('Success'))
    .catch((err) => console.log('FS operation failed'));
};
