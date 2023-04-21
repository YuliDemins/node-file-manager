import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import { absolutePath } from './cdDir.js';

export const compressFile = async (dir, filePath, fileDestination) => {
  if (!filePath && !file) {
    console.log('Invalid input');
    return dir;
  }
  else {
    const readStream = fs.createReadStream(absolutePath(dir, filePath));
    const brotli = zlib.createBrotliCompress();
    const writeStream = fs.createWriteStream(absolutePath(dir, fileDestination));
  
    try {
      await pipeline(readStream, brotli, writeStream)
      console.log('Success');
    }
    catch (err) {
      console.log('FS operation failed', err);
    }
  }
}

export const decompressFile = async (dir, filePath, fileDestination) => {
  if (!filePath && !file) {
    console.log('Invalid input');
    return dir;
  }
  else {
    const readStream = fs.createReadStream(absolutePath(dir, filePath));
    const writeStream = fs.createWriteStream(absolutePath(dir, fileDestination));
    const brotli = zlib.createBrotliDecompress();
    try {
      await pipeline(readStream, brotli, writeStream)
      console.log('Success');
    }
    catch (err) {
      console.log('FS operation failed', err);
    }
  }
}