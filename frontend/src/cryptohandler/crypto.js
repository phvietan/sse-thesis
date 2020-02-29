const crypto = require('crypto')

const IV_LENGTH = 16;
const AES_KEY_SIZE = 32
const IV_HEX_LENGTH = 32;

const fromHexString = hexString =>
  new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

const toHexString = bytes =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

class CryptoHandler {
  static GenerateRandomAESKey() {
    // const array = new Uint32Array(8);
    const randomNumbers = crypto.randomBytes(AES_KEY_SIZE);
    return randomNumbers;
  }

  // TODO: add padding for hex iv to have length = 32
  static SymmetricEncrypt(key, plaintext) {
    const iv = crypto.randomBytes(IV_LENGTH);
    console.log(iv);
    const cipher = crypto
      .createCipheriv('aes-256-cbc', key, iv);
    cipher.update(plaintext, 'utf8', 'base64');
    const encrypted = cipher.final('base64');
    return toHexString(iv) + toHexString(encrypted)
  }

  static ParseIv(ciphertext) {
  }

  static SymmetricDecrypt(key, ciphertext) {
    const iv = ciphertext.slice(0, IV_HEX_LENGTH)
    const c = ciphertext.slice(IV_HEX_LENGTH, ciphertext.length)

    // let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    // let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    // return (decrypted + decipher.final('utf8'));
  }
}

module.exports = {
  CryptoHandler
}
