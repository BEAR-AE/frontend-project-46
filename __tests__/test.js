import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/gendifflogic.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getContent = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendifflogic', () => {
  test.each([
    ['file1.json', 'file2.json', 'resultStylish.txt', 'stylish'],
    ['file3.yml', 'file4.yml', 'resultStylish.txt', 'stylish'],
    ['file1.json', 'file2.json', 'resultPlain.txt', 'plain'],
    ['file3.yml', 'file4.yml', 'resultPlain.txt', 'plain'],
    ['file1.json', 'file2.json', 'resultJson.txt', 'json'],
  ])('should generate diff in %s format', (file1, file2, resultFile, format) => {
    const expectedResult = getContent(resultFile);
    const actualResult = genDiff(getFixturePath(file1), getFixturePath(file2), format);
    expect(actualResult).toBe(expectedResult);
  });

  test('should throw error for non-supported format', () => {
    expect(() => genDiff(getFixturePath('file5.txt'), getFixturePath('file6.txt'))).toThrowError('Non supported format of file');
  });

  test('should throw error for unknown format', () => {
    expect(() => genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'Error')).toThrowError('Unknown format: Error');
  });
