const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR);

function handleUpload(req, res) {
    let data = [];

    req.on('data', chunk => data.push(chunk));
    req.on('end', () => {
        const boundary = req.headers['content-type'].split('boundary=')[1];
        const buffer = Buffer.concat(data);
        const parts = buffer.toString().split('--' + boundary);

        parts.forEach(part => {
            if (part.includes('filename=')) {
                const match = part.match(/filename="(.+?)"/);
                if (!match) return;
                const filename = match[1];
                const startIndex = part.indexOf('\r\n\r\n') + 4;
                const fileData = part.slice(startIndex, part.lastIndexOf('\r\n'));
                fs.writeFileSync(path.join(ASSETS_DIR, filename), fileData, 'binary');
            }
        });

        res.writeHead(200);
        res.end('Upload successful');
    });
}

module.exports = { handleUpload };
