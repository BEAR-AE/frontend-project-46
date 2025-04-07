import _ from 'lodash';

const isComplex = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
const formatValue = (value) => {
  if (isComplex(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : String(value);
};

const plainFormat = (diffData, parent = '') => {
  const result = diffData.flatMap((entry) => {
    const fullPath = parent ? `${parent}.${entry.key}` : entry.key;

    switch (entry.type) {
      case 'added':
        return `Property '${fullPath}' was added with value: ${formatValue(entry.value)}`;
      case 'removed':
        return `Property '${fullPath}' was removed`;
      case 'unchanged':
        return null;
      case 'changed':
        return `Property '${fullPath}' was updated. From ${formatValue(entry.firstValue)} to ${formatValue(entry.secondValue)}`;
      case 'nested':
        return plainFormat(entry.children, fullPath);
      default:
        throw new Error(`Unsupported node type: '${entry.type}'`);
    }
  });

  return result.filter((entry) => entry !== null).join('\n');
};

export default plainFormat;
