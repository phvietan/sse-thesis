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

function calculateFileHash(userHash, fileNumber) {
    return calculateHash({ userHash, fileNumber });
}

function getParent(i, j) {
    return {
        px: i+1,
        py: 1 + Math.floor((j-1) / 2),
    };
}

function isLeftChild(i, j) {
    return j % 2 === 1;
}

function isRightChild(i, j) {
    return j % 2 === 0;
}

function getLeftChild(i, j) {
    const childLeft = 2 * (j - 1) + 1;
    return { i: i-1, j: childLeft };
}

function getRightChild(i, j) {
    const childRight = 2 * j;
    return { i: i-1, j: childRight };
}

module.exports = {
    isString,
    calculateHash,
    calculateFileHash,
    getParent,
    getLeftChild,
    getRightChild,
    isLeftChild,
    isRightChild,
};