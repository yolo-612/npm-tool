const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');

function handleDownload(req, res, url) {
    const fileName = url.searchParams.get('name');
    const filePath = path.join(ASSETS_DIR, fileName);

    if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        return res.end('File not found');
    }

    res.writeHead(200, {
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Type': 'application/octet-stream',
    });

    fs.createReadStream(filePath).pipe(res);
}

module.exports = { handleDownload };
