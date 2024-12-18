import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import getDiff from '../src/getDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const resultExpected = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8').trim();

test.each([
  {
    file1: 'file1.json', file2: 'file2.json', format: undefined, expected: 'resultStylish.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', format: 'plain', expected: 'resultPlain.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', format: 'json', expected: 'resultJson.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', format: undefined, expected: 'resultStylish.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', format: 'plain', expected: 'resultPlain.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', format: 'json', expected: 'resultJson.txt',
  },

])('compare', ({
  file1, file2, format, expected,
}) => {
  expect(getDiff(getFixturePath(file1), getFixturePath(file2), format))
    .toBe(resultExpected(expected));
});