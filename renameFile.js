import path from 'path';
import fs from 'fs';
import os from 'os';
import { absolutePath } from './cdDir.js';

let DIR = os.homedir();

export const renameFile = (dir, filePath, file) => {
    if (!filePath && !file) {
        console.log('Invalid input');
        return dir;
    }
    else {
        let newPath = path.parse(filePath).dir;
        let oldFile = path.parse(filePath).base;

        if (!fs.existsSync(absolutePath(dir, newPath, oldFile))) {
            console.log('FS operation is failed');
        }
        else {
            fs.rename(absolutePath(dir, newPath, oldFile), absolutePath(dir, newPath, file), (error) => {
                if (error) console.log('FS operation failed');
                else {
                    console.log('Success');
                } 
            })
        }
    DIR = absolutePath(dir, newPath);
    return DIR;
    }   
};
