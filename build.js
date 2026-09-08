const fs = require('fs');

const requiredFiles = [
  'app.js',
  'package.json',
  'public/index.html'
];

console.log('Starting application build validation...');

let buildFailed = false;

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.error(`Build Failed: ${file} not found`);
    buildFailed = true;
    break;
  }
}

if (!buildFailed) {
  console.log('Application files validated successfully.');
  console.log('Build completed successfully.');
}

if (buildFailed) {
  process.exit(1);
}
