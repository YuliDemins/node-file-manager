import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import { absolutePath, sendMessage } from './service.js';

export const compressFile = (dir, filePath, fileDestination) => {
  if (!filePath || !fileDestination) {
    console.log('Invalid input');
    return dir;
  }

  let fileWithExt = path.parse(filePath).base;

  if (!fs.existsSync(absolutePath(dir, filePath)) || !fs.existsSync(absolutePath(dir, fileDestination))) console.log('Invalid input');

  fs.stat(absolutePath(dir, filePath), (err, stats) => {
    if (err) console.log('Invalid input');

    if (stats.isFile()) {
        const readStream = fs.createReadStream(absolutePath(dir, filePath));
        const brotli = zlib.createBrotliCompress();
        const writeStream = fs.createWriteStream(absolutePath(dir, fileDestination, fileWithExt + '.br'));
      
        try {
          pipeline(readStream, brotli, writeStream)
        }
        catch (err) {
          console.log('FS operation failed');
        }
  }})
  sendMessage(dir);
}


export const decompressFile = (dir, filePath, fileDestination) => {
  if (!filePath || !fileDestination) {
    console.log('Invalid input');
    return dir;
  };

  let fileName = path.basename(filePath, '.br');

  if (!fs.existsSync(absolutePath(dir, filePath)) || !fs.existsSync(absolutePath(dir, fileDestination))) console.log('Invalid input');
  else {
    fs.stat(absolutePath(dir, filePath), (err, stats) => {
      if (err) console.log('Invalid input');
      if (stats.isFile()) {
          const readStream = fs.createReadStream(absolutePath(dir, filePath));
          const writeStream = fs.createWriteStream(absolutePath(dir, fileDestination, fileName));
          const brotli = zlib.createBrotliDecompress();
          
          try {
            pipeline(readStream, brotli, writeStream)
          }
          catch (err) {
            console.log('FS operation failed');
          }
    }})
  }
  sendMessage(dir);
}