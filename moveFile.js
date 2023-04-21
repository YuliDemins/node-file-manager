import fs from 'fs';
import { absolutePath } from './cdDir.js';

export const moveFile = (dir, filePath, file) => {
  const readableStream = fs.createReadStream(absolutePath(dir, filePath));
  const writableStream = fs.createWriteStream(absolutePath(dir, file));
  
  readableStream.on('data', (chunk) => {
    writableStream.write(chunk);
  });
  
  readableStream.on('end', () => {
    readableStream.close();
    writableStream.end();

  fs.unlink(absolutePath(dir, filePath), (error) => {
    if (error) console.log('FS operation failed');
  });

  console.log('Success')
});
  
  readableStream.on('error', (error) => {
    console.log('FS operation failed');
  });
  
  writableStream.on('error', (error) => {
    console.log('FS operation failed');
  });
};