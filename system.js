import os from 'os';

const getEOL = () => {
  console.log(JSON.stringify(os.EOL));
}

const getCPUS = () => {
  const arrModel = [];
  
  os.cpus().map((item) => arrModel.push(item.model));
  console.log(`overall amount of CPUS: ${cpus.length}
${arrModel.join('\n')}`);
}

const getHomedir = () => {
  console.log(os.homedir());
}

const getUsername = () => {
  console.log(os.userInfo().username)
}

const getArch = () => {
  console.log(os.arch())
}

export const getInfoOs = (file) => {
  if (file == '--EOL') getEOL();
  if (file == '--cpus') getCPUS();
  if (file == '--homedir') getHomedir();
  if (file == '--username') getUsername();
  if (file == '--architecture') getArch();
}