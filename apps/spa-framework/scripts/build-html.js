const fs = require('fs');
const path = require('path');
const src = path.resolve(__dirname, '../src/index.html');
const dest = path.resolve(__dirname, '../dist/index.html');
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
console.log('build index.html to dist.');
