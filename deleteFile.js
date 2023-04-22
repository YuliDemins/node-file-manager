import fs from 'fs/promises';
import { absolutePath, sendMessage } from './service.js';

export const deleteFile = (dir, file) => {
  if (!file) {
    console.log('Invalid input');
  }
  else {
    const filePath = absolutePath(dir, file);
    
    fs.rm(filePath)
      .then(() => sendMessage(dir))
      .catch((err) => console.log('FS operation failed'));
  }

};
