const crypto = require('crypto');

const isString = (value) => (
    typeof value === 'string' || value instanceof String
);

function calculateHash(obj) {
    const hash = crypto.createHash('sha256');
    const buf = Buffer.from(JSON.stringify(obj));
    hash.update(buf);
    return hash.digest('hex');
}

module.exports = { isString, calculateHash };