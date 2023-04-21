import fs from 'fs';
import path from 'path';

export const showInfoDir = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.log("FS operation is failed");
      return;
    }
  
    const arrDirectory = [];
    const arrFile = [];
  
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.log("FS operation is failed");
          return;
        }
  
        const type = stats.isDirectory() ? 'directory' : 'file';
        const info = { name: file, type: type };
  
        if (type === 'directory') {
          arrDirectory.push(info);
        } else {
          arrFile.push(info);
        }
  
        if (arrDirectory.length + arrFile.length === files.length) {
          const sortDir = arrDirectory.sort((a, b) => a.name - b.name);
          const sortFile = arrFile.sort((a, b) => a.name - b.name);
          const sortResult = [...sortDir, ...sortFile];
          console.table(sortResult);
        }
      });
    });
  })
  }