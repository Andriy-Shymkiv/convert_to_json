const fs = require('fs');

const convertToJSON = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8').split('\n');
  const result = {};

  data.forEach((line) => {
    const [key, value] = line.split(' = ');
    const keys = key.split('.');

    let current = result;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (i === keys.length - 1) {
        current[key] = value;
      } else {
        current[key] = current[key] || {};
        current = current[key];
      }
    }
  });

  return JSON.stringify(result, null, 2);
};

const data = convertToJSON('./src/data.txt');
console.log(data); // node src/convertToJSON.js
