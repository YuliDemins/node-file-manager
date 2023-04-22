import fs from 'fs';
import path from 'path';
import { absolutePath, sendMessage } from './service.js';

export const copyFile = (dir, filePath, file) => {
  if (!filePath || !file) {
    console.log('Invalid input');
    return dir;
  }

  let directory = path.parse(filePath).dir;
  let fileWithExt = path.parse(filePath).base;

  if (!fs.existsSync(absolutePath(dir, filePath)) || !fs.existsSync(absolutePath(dir, file)))  {
    console.log('Invalid input');
    return dir;
  }
  else {
    fs.stat(absolutePath(dir, filePath), (err, stats) => {
      if (err) {
        console.log('Invalid input');
        return dir;
      };
      if (stats.isFile()) {
          const readableStream = fs.createReadStream(absolutePath(dir, filePath));
          const writableStream = fs.createWriteStream(absolutePath(dir, file, fileWithExt));
      
          readableStream.on('data', (chunk) => {
            writableStream.write(chunk);
          });
      
          readableStream.on('end', () => {
            readableStream.close();
            writableStream.end();
            sendMessage(dir);
          });
      
          readableStream.on('error', (error) => {
            console.log('FS operation failed');
          });
      
          writableStream.on('error', (error) => {
            console.log('FS operation failed');
          });
      }
      else {
        console.log('Invalid input');
        return dir;
      };
    })
  }
};