import fs from 'fs';
import { absolutePath } from './cdDir.js';

export const createFile = (dir, file) => {
    if (!file) {
        console.log('Invalid input');
    }
    else {
        fs.readdir(dir, (error, files) => {
            if (error) console.log('FS operation failed');

            if (files.includes(file)) console.log('FS operation failed');
            else {
                fs.writeFile(absolutePath(dir, file), '', (error) => {
                    if (error) console.log('FS operation failed');
                    else console.log('success')
                })
            }
        });
    }
};