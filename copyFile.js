import fs from 'fs';
import { absolutePath } from './cdDir.js';

export const copyFile = (dir, filePath, file) => {
  if (!filePath && !file) {
    console.log('Invalid input');
    return dir;
  }
  else {
    const readableStream = fs.createReadStream(absolutePath(dir, filePath));
    const writableStream = fs.createWriteStream(absolutePath(dir, file));
    
    readableStream.on('data', (chunk) => {
      writableStream.write(chunk);
    });
    
    readableStream.on('end', () => {
      readableStream.close();
      writableStream.end();
      console.log('Success')
    });
    
    readableStream.on('error', (error) => {
      console.log('FS operation failed');
    });
    
    writableStream.on('error', (error) => {
      console.log('FS operation failed');
    });
  }
};