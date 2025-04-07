import _ from 'lodash';

const isComplex = (value) => _.isObject(value) && !_.isArray(value) && !_.isNull(value);

const formatValue = (value) => {
  if (isComplex(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : String(value);
};

const plainFormat = (diffData, parent = '') => {
  const result = diffData.flatMap((node) => {
    const fullPath = parent ? `${parent}.${node.key}` : node.key;

    switch (node.type) {
      case 'added':
        return `Property '${fullPath}' was added with value: ${formatValue(node.value)}`;
      case 'removed':
        return `Property '${fullPath}' was removed`;
      case 'unchanged':
        return null;
      case 'changed':
        return `Property '${fullPath}' was updated. From ${formatValue(node.firstValue)} to ${formatValue(node.secondValue)}`;
      case 'nested':
        return plainFormat(node.children, fullPath);
      default:
        throw new Error(`Unsupported node type: '${node.type}'`);
    }
  }).filter(Boolean);

  return result.join('\n');
};

export default plainFormat;
