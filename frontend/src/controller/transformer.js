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

// Check node (i, j) contains node (di, dj)
function checkNodeContains(i, j, di, dj) {
    const { L, R } = getRange(i, j);
    const { L: L2, R: R2 } = getRange(di, dj);
    return L <= L2 && R2 <= R;
}

// Transform trapdoor t from node (i, j) to node (di, dj) 
function transformT(t, i, j, di, dj, kul, kur) {
    while (i !== di || j !== dj) {
        console.log({ i, j, di, dj });
        if (checkNodeContains(i, j, di, dj)) {
            const childLeft = 2 * (j - 1) + 1;
            const childRight =  2 * j;
            if (checkNodeContains(i-1, childLeft, di, dj)) {
                t = kur.encrypt(t);
                i = i-1;
                j = childLeft;
            } else {
                t = kul.encrypt(t);
                i = i-1;
                j = childRight;
            }
        } else {
            t = (j % 2 === 1) ? kur.decrypt(t) : kul.decrypt(t);
            i = i+1;
            j = 1 + Math.floor((j-1) / 2);
        }
    }
    return t;
}

function transformWordToNode(w, i, j, kul, kur, sk) {
    if (!util.isString(w)) return "0";
    const t = PRF(sk, w);

    // Transform from (1,1) to (1,n)
    return transformT(t, 1, 1, i, j, kul, kur);
}

function transformWord(w, n, kul, kur, sk) {
    return transformWordToNode(w, 1, n, kul, kur, sk);
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
    const trapdoors = words.reduce(
        (acc, val) => acc = [...acc, transformWord(val, n, kul, kur, sk)]
    , []);
    
    const exampleTrapdoor = trapdoors[0] || '';
    const fakeLength = exampleTrapdoor.length;
    let uniqueTrapdoors = [...new Set(trapdoors)];
    while (uniqueTrapdoors.length < trapdoors.length) {
        uniqueTrapdoors.push(getRandomHex(fakeLength));
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
    getRange,
    transformWord,
    transformBatch,
    transformWordToNode,
};