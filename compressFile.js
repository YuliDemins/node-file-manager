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
  else if (!fs.existsSync(absolutePath(dir, filePath))) console.log('Invalid input');
  fs.stat(absolutePath(dir, filePath), (err, stats) => {
    if (err) console.log('Invalid input');
    if (stats.isFile()) {
      if(path.extname(absolutePath(dir, fileDestination))) {
        const readStream = fs.createReadStream(absolutePath(dir, filePath));
        const brotli = zlib.createBrotliCompress();
        const writeStream = fs.createWriteStream(absolutePath(dir, fileDestination));
      
        try {
          pipeline(readStream, brotli, writeStream)
        }
        catch (err) {
          console.log('FS operation failed');
        }
      }
      else console.log('Invalid input');
  }})
  sendMessage(dir);
}

export const decompressFile = (dir, filePath, fileDestination) => {
  if (!filePath || !fileDestination) {
    console.log('Invalid input');
    return dir;
  }
  else if (!fs.existsSync(absolutePath(dir, filePath))) console.log('Invalid input');
  fs.stat(absolutePath(dir, filePath), (err, stats) => {
    if (err) console.log('Invalid input');
    if (stats.isFile()) {
      if(path.extname(absolutePath(dir, fileDestination))) {
        const readStream = fs.createReadStream(absolutePath(dir, filePath));
        const writeStream = fs.createWriteStream(absolutePath(dir, fileDestination));
        const brotli = zlib.createBrotliDecompress();
        
        try {
          pipeline(readStream, brotli, writeStream)
        }
        catch (err) {
          console.log('FS operation failed');
        }
      }
  else console.log('Invalid input');
}})
sendMessage(dir);
}