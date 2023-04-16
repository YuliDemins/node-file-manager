import fs from 'fs/promises';
import path from 'path';

export const deleteFile = (dir, file) => {
  const filePath = path.join(dir, file);
    
  fs.rm(filePath)
    .then(() => console.log('Success'))
    .catch((err) => console.log('FS operation failed'));
};
