const { RSAHandler } = require('../crypto/rsahandler');
const { AESHandler } = require('../crypto/aeshandler');
const storage = require('../storage/storage');
const util = require('../crypto/util');

function aesFromStorage(key) {
  return util.hexToBuffer(key);
}

function aesToStorage(key) {
  return util.bufferToHex(key);
}

function rsaToStorage(key) {
  const { rsa } = key;
  return {
    n: rsa.n.toString(16),
    e: rsa.e.toString(16),
    d: rsa.d.toString(16),
    p: rsa.p.toString(16),
    q: rsa.q.toString(16),
    dmp1: rsa.dmp1.toString(16),
    dmq1: rsa.dmq1.toString(16),
    coeff: rsa.coeff.toString(16),
  };
}

// Get AES key and RSA key in localstorage
function getKeys() {
  const firstTime = !storage.getFromStorage("AES") || !storage.getFromStorage("RSA1") || !storage.getFromStorage("RSA2");

  const aesKey = !storage.getFromStorage("AES") ? 
    AESHandler.GenerateKey() :
    aesFromStorage(storage.getFromStorage("AES"));

  const rsaKey1 = new RSAHandler(storage.getFromStorage("RSA1"));
  const rsaKey2 = new RSAHandler(storage.getFromStorage("RSA2"));

  // Parse values to hex and store to localstorage
  storage.setToStorage("AES", aesToStorage(aesKey));
  storage.setToStorage("RSA1", rsaToStorage(rsaKey1));
  storage.setToStorage("RSA2", rsaToStorage(rsaKey2));

  return {
    aesKey,
    rsaKey1,
    rsaKey2,
    firstTime,
  }
}

module.exports = {
  getKeys,
}