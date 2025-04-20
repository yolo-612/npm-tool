const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');

function handleList(req, res) {
    fs.readdir(ASSETS_DIR, (err, files) => {
        if (err) {
            res.writeHead(500);
            return res.end('Failed to list files');
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(files));
    });
}

module.exports = { handleList };
