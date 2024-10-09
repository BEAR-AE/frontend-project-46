import { readFileSync } from 'fs';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  const absoluteFile1 = path.resolve(filepath1);
  const absoluteFile2 = path.resolve(filepath2);

  const fileContent1 = readFileSync(absoluteFile1, 'utf8');
  const fileContent2 = readFileSync(absoluteFile2, 'utf8');

  console.log(fileContent1);
  console.log(fileContent2);
};

export default genDiff;
