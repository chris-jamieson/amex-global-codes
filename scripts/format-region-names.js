const path = require('path');
const humanize = require('humanize-string');
const { readFile, writeFile } = require('fs/promises');

async function main() {
  const p = path.join(__dirname, '..', 'lib', 'regions', 'data.json');

  console.log('p:', p);
  const regions = JSON.parse(await readFile(p));

  console.log('regions[0]: ', regions[0]);
  const formatted = [];
  regions.forEach((region) => {
    region.formattedName = humanize(region.name);
    formatted.push(region);
  });

  // all done, write the file
  await writeFile(p, JSON.stringify(formatted, null, 2));
  return null;
}

main()
  .then(() => console.log('Done'))
  .catch((err) => {
    console.error('Error: ', err.message);
    process.exit(1);
  });
