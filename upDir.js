import os from 'os';
import path, { dirname, sep } from 'path';


const makeArrDir = (filePath) => {
  let arrDir = filePath.split(sep);
  return arrDir;
}

const makeStringDirUp = (arr) => {
  let stringDir = arr.slice(0,-1).join(sep);
  return stringDir;
} 

const dir = os.homedir();
let arr = makeArrDir(dir);

export const upDir = () => {
  if (arr.join(sep) == path.parse(dir).root.slice(0, -1)) {
    console.log(path.parse(dir).root.slice(0, -1))
  } else {
  console.log(makeStringDirUp(arr));
      arr = arr.slice(0,-1);
  }
}