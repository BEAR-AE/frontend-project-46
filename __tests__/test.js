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
    ['file1.json', 'file2.json', 'resultJson.txt', 'json'],
    ['file3.yml', 'file4.yml', 'resultJson.txt', 'json'],
    ['file1.json', 'file2.json', 'resultPlain.txt', 'plain'],
    ['file3.yml', 'file4.yml', 'resultPlain.txt', 'plain'],
    ['file1.json', 'file2.json', 'resultStylish.txt', 'stylish'],
    ['file3.yml', 'file4.yml', 'resultStylish.txt', 'stylish'],
  ])('should generate diff in %s format', (file1, file2, resultFile, format) => {
    const actualResult = genDiff(getFixturePath(file1), getFixturePath(file2), format);
    const expectedContent = getContent(resultFile);
    expect(actualResult).toBe(expectedContent);
  });

  test('should throw error for non-supported format', () => {
    expect(() => genDiff(getFixturePath('file5.txt'), getFixturePath('file6.txt'))).toThrow('Non supported format of file');
  });

  test('should throw error for unknown format', () => {
    expect(() => genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'Error')).toThrow('Unknown format: Error');
  });
});
