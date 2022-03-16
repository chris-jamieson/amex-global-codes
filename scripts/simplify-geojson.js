const simplify = require('simplify-geojson');
const path = require('path');
const { readFile, writeFile } = require('fs/promises');
const { readdirSync, statSync } = require('fs');

// Simplification tolerance can be configured according to preference
// It is a number in degrees (e.g. lat/lon distance). 1 degree is roughly equivalent to 69 miles. the default is 0.001, which is around a city block long.
const TOLERANCE = 0.005;

async function main() {
  try {
    const p = path.join(__dirname, '..', 'lib', 'regions', 'geojson');
    const filesArr = getAllFiles(p);

    for (const filePath of filesArr) {
      const file = await readFile(filePath);
      const lenBefore = new TextEncoder().encode(file).length;
      const simplified = simplify(JSON.parse(file), TOLERANCE);
      const simplifiedStringified = JSON.stringify(simplified);
      const lenAfter = new TextEncoder().encode(simplifiedStringified).length;
      if (lenBefore > lenAfter) {
        // write to file
        await writeFile(filePath, simplifiedStringified);
      }
    }
  } catch (error) {
    console.error('Error: ', error.message);
    process.exit(1);
  }

  console.log('Done');
}

const getAllFiles = function (dirPath, arrayOfFiles) {
  files = readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });

  return arrayOfFiles;
};

main();
