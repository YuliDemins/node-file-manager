import fs from 'fs';
import path from 'path';

export const readFile = (dir, file) => {
let filePath = '';

if (!fs.existsSync(path.join(dir, file))) console.log('FS operation is failed');
else {
  filePath = path.join(dir, file);
 
const readStream = fs.createReadStream(filePath);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.log('FS operation failed');
      return;
    }
    if (stats.isFile()) {
      readStream.on('data', (data) => process.stdout.write(data + '\n'));
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
  