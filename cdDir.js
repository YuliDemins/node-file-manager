import os from 'os';
import fs from 'fs';
import { absolutePath, sendMessage } from './service.js';

let DIR = os.homedir();

export const cdDir = (dir, file) => {
    if (!file) {
        console.log('Invalid input');
        return DIR;
    }
    else {
        DIR = absolutePath(dir, file);
        if (fs.existsSync(DIR)) {
            sendMessage(DIR);
            return DIR;
        }
        else {
            console.log('FS operation is failed')
            return dir;
        }
    }
};

