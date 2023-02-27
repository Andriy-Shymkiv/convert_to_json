const fs = require('fs');
const path = require('path');

const inputFilePath = 'src/data.txt';
const outputFilePath = 'src/output.json';

const inputData = fs.readFileSync(inputFilePath, 'utf8').trim().split('\n');

const outputData = {};

inputData.forEach((line) => {
  const [key, value] = line.split(' = ');
  const keys = key.split('.');
  let currentObj = outputData;

  keys.forEach((keyPart, index) => {
    if (!currentObj[keyPart]) {
      if (index === keys.length - 1) {
        currentObj[keyPart] = value;
      } else {
        currentObj[keyPart] = {};
      }
    } else if (typeof currentObj[keyPart] === 'string') {
      currentObj[keyPart] = [currentObj[keyPart], value];
    } else {
      currentObj[keyPart][Object.keys(currentObj[keyPart]).length] = value;
    }
    currentObj = currentObj[keyPart];
  });
});

fs.writeFileSync(outputFilePath, JSON.stringify(outputData, null, 2));
