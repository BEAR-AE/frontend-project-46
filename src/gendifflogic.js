import fs from 'fs';
import path from 'path';
import getParser from './parsers.js';
import getFormatter from './formatters/getFormatter.js';
import compareValues from './compareValues.js';

const getContent = (file) => {
  const absolutePath = path.resolve(process.cwd(), file);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');

  const fileFormat = path.extname(absolutePath).slice(1);

  return [fileContent, fileFormat];
};

const genDiff = (file1, file2, format = 'stylish') => {
  const [content1, format1] = getContent(file1);
  const [content2, format2] = getContent(file2);

  const parsedFile1 = getParser(content1, format1);
  const parsedFile2 = getParser(content2, format2);

  const result = compareValues(parsedFile1, parsedFile2);

  const formatter = getFormatter(format);

  return formatter(result);
};

export default genDiff;
