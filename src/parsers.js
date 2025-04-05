import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

const getParser = (fileContent, fileFormat) => {
  const parser = parsers[fileFormat];
  if (!parser) {
    throw new Error('Non supported format of file');
  }
  return parser(fileContent);
};

export default getParser;
