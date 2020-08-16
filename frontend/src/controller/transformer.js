const crypto = require('crypto');

const util = require('./util');

function PRF(sk, word) {
    const hmac = crypto.createHmac('sha256', sk);
    hmac.update(word);
    return hmac.digest('hex');
}

function getRange(i, j) {
    const L = (1<<(i-1))*(j-1) + 1;
    const R = (1<<(i-1))*j;
    return { L, R };
}

// Check node (i, j) contains file n
function checkNodeContains(i, j, n) {
    const { L, R } = getRange(i, j);
    return L <= n && n <= R;
}

// Transform trapdoor t from node (i, j) to node (1, n) 
function transformT(t, i, j, n, kul, kur) {
    while (i !== 1 || j !== n) {
        if (checkNodeContains(i, j, n)) {
            const childLeft = 2 * (j - 1) + 1;
            const childRight =  2 * j;
            if (checkNodeContains(i-1, childLeft, n)) {
                t = kur.encrypt(t);
                i = i-1;
                j = childLeft;
            } else {
                t = kul.encrypt(t);
                i = i-1;
                j = childRight;
            }
        } else {
            t = kur.decrypt(t);
            i = i+1;
            j = 1 + Math.floor((j-1) / 2);
        }
    }
    return t;
}

function transformWord(w, n, kul, kur, sk) {
    if (!util.isString(w)) return "0";
    const t = PRF(sk, w);
    return transformT(t, 1, 1, n, kul, kur);
}

function getRandomHex(len) {
    const hex = '0123456789abcdef';
    let output = '';
    for (let i = 0; i < len; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
}

function transformBatch(content, n, kul, kur, sk) {
    const words = content.split(' ');
    console.log(words);
    const trapdoors = words.reduce(
        (acc, val) => acc = [...acc, transformWord(val, n, kul, kur, sk)]
    , []);

    let uniqueTrapdoors = [...new Set(trapdoors)];
    while (uniqueTrapdoors.length < trapdoors.length) {
        uniqueTrapdoors.push(getRandomHex(64));
    }
    for (let i = uniqueTrapdoors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = uniqueTrapdoors[i];
        uniqueTrapdoors[i] = uniqueTrapdoors[j];
        uniqueTrapdoors[j] = temp;
    }
    return uniqueTrapdoors.join(' ');
}

module.exports = {
    transformWord,
    transformBatch,
};