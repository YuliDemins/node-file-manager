import path from 'path';
import fs from 'fs';

export const createFile = (dir, file) => {

    fs.readdir(dir, (error, files) => {
        if (error) console.log('FS operation failed');

        if (files.includes(file)) console.log('FS operation failed');
        else {
            fs.writeFile(path.join(dir, file), '', (error) => {
                if (error) console.log('FS operation failed');
                else console.log('success')
            })
        }
    });
};