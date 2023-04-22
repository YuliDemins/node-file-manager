import fs from 'fs';
import { absolutePath, sendMessage } from './service.js';

export const readFile = (dir, file) => {
  if (!file) {
    console.log('Invalid input');
  }
  else {
    let filePath = '';

    if (!fs.existsSync(absolutePath(dir, file))) console.log('FS operation is failed');
    else {
      filePath = absolutePath(dir, file);
     
    const readStream = fs.createReadStream(filePath);
    
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.log('FS operation failed');
          return;
        }
        if (stats.isFile()) {
          readStream.on('data', (data) => {
            process.stdout.write(data + '\n');
            sendMessage(dir);
          });
          readStream.on('error', (error) => {
              if (error) {
                 console.log('FS operation failed');
              }
          });
        } else {
          console.log('Change file');
        }
      })
    }
  }
}
  