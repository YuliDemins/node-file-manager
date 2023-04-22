import fs from 'fs';
import path from 'path';
import { sendMessage } from './service.js';

export const showInfoDir = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.log("FS operation is failed");
      return;
    }
  
    const arrDirectory = [];
    const arrFile = [];
    const arrNoFile = [];
    
  
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      
      fs.stat(filePath, (err, stats) => {
        if (err) {
          arrNoFile.push({name: file, type: 'unknown'});
          return;
        }
  
        const type = stats.isDirectory() ? 'directory' : 'file';
        const info = { name: file, type: type };
  
        if (type === 'directory') {
          arrDirectory.push(info);
        }
        else if (type === 'file') {
          arrFile.push(info);
        }
        else {
          arrNoFile.push(info);
        }
  if (files) {
    if (arrDirectory.length + arrFile.length + arrNoFile.length === files.length) {
      const sortDir = arrDirectory.sort((a, b) => a.name - b.name);
      const sortFile = arrFile.sort((a, b) => a.name - b.name);
      const sortResult = [...sortDir, ...sortFile];
      console.table(sortResult);
      sendMessage(dir);
    }
  }
  else {
    console.log('no files');
    sendMessage(dir);
  }

      });
    });
  })
  }