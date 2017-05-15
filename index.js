require('colors');

JSON.stringifyNoColor = JSON.stringify;

JSON.stringify = function (obj, filter, indent, level) {
  indent = indent || 0;
  level = level || 0;

  var output = '';
  if (typeof obj === 'string') {
    output += obj.green;

  } else if (typeof obj === 'number') {
    output += ('' + obj).cyan;

  } else if (typeof obj === 'boolean') {
    output += (obj ? 'true' : 'false').red;

  } else if (obj === null) {
    output += 'null'.blue;

  } else if (obj !== undefined && typeof obj !== 'function') {
    if (obj.length === undefined) {
      output += '{\n'.grey;
      Object.keys(obj).forEach(key => {
        var value = obj[key];

        if (filter) {
          if (typeof filter === 'function') {
            value = filter(key, value);

          } else if (typeof filter === 'object' && filter.length !== undefined) {
            if (filter.indexOf(key) < 0) {
              return;
            }
          }
        }

        if (value === undefined) {
          return;
        }

        output += ' '.repeat(indent + level * indent) + '"'.grey + key.magenta + '":'.grey + (indent ? ' ' : '');

        if (typeof value === 'string') {
          // This is needed by console.log auto stringify
          output += '"'.grey + JSON.stringify(value, filter, indent, level + 1) + '"'.grey + ',\n';
        } else {
          output += JSON.stringify(value, filter, indent, level + 1) + ',\n';
        }
      });

      output = output.replace(/,\n$/, '\n');
      output += ' '.repeat(level * indent) + '}'.grey;

    } else {
      output += '[\n'.grey;
      obj.forEach(subObj => {
        output += ' '.repeat(indent + level * indent) + JSON.stringify(subObj, filter, indent, level + 1) + ',\n';
      });

      output = output.replace(/,\n$/, '\n');
      output += ' '.repeat(level * indent) + ']'.grey;
    }
  }

  output = output.replace(/,$/gm, ','.grey);
  if (indent === 0) {
    return output.replace(/\n/g, '');
  }

  return output;
}

module.exports = JSON;