import os from 'os';
import { sendMessage } from './service.js';

const getEOL = () => console.log(JSON.stringify(os.EOL));

const getCPUS = () => {
  const arrModel = [];
  
  os.cpus().map((item) => arrModel.push(item.model));
  console.log(`overall amount of CPUS: ${arrModel.length}
${arrModel.join('\n')}`);
};

const getHomedir = () => console.log(os.homedir());

const getUsername = () => console.log(os.userInfo().username);

const getArch = () => console.log(os.arch());

const osCall = {
  '--EOL': getEOL,
  '--cpus': getCPUS,
  '--homedir': getHomedir,
  '--username': getUsername,
  '--architecture': getArch
};

export const getInfoOs = (DIR, file) => {
  const cb = osCall[file];
  if (cb) {
    cb();
  } else {
    console.log(`Invalid input`);
  }
  sendMessage(DIR);
};