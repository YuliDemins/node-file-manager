import path from 'path';

export const sendMessage = (dir) => console.log(`\nYou are currently in ${dir}\n`)

export const absolutePath = (dir, ...file) => path.isAbsolute(path.join(...file)) ? path.join(...file) : path.join(dir, path.join(...file));