import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';

export const compressFile = async (dir, filePath, fileDestination) => {
  const readStream = fs.createReadStream(path.join(dir, filePath));
  const brotli = zlib.createBrotliCompress();
  const writeStream = fs.createWriteStream(path.join(dir, fileDestination));
  
  try {
    await pipeline(readStream, brotli, writeStream)
    console.log('Success');
  }
  catch (err) {
    console.log('FS operation failed', err);
  }
}

export const decompressFile = async (dir, filePath, fileDestination) => {
  const readStream = fs.createReadStream(path.join(dir, filePath));
  const writeStream = fs.createWriteStream(path.join(dir, fileDestination));
  const brotli = zlib.createBrotliDecompress();
  try {
    await pipeline(readStream, brotli, writeStream)
    console.log('Success');
  }
  catch (err) {
    console.log('FS operation failed', err);
  }
}