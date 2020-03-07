const util = require('./util');
const crypto = require('crypto');

const IV_LENGTH = 16;
const AES_KEY_SIZE = 32
const IV_HEX_LENGTH = 32;

class AESHandler {
  static GenerateKey() {
    const randomNumbers = crypto.randomBytes(AES_KEY_SIZE);
    return randomNumbers;
  }

  static Encrypt(key, plaintext) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto
      .createCipheriv('aes-256-cbc', key, iv);
      
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return util.bufferToHex(iv) + encrypted
  }

  static Decrypt(key, ciphertext) {
    const iv = util.hexToBuffer(ciphertext.slice(0, IV_HEX_LENGTH))
    const c = ciphertext.slice(IV_HEX_LENGTH, ciphertext.length)

    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(c, 'hex', 'utf8');

    return (decrypted + decipher.final('utf8'));
  }
}

module.exports = {
  AESHandler,
}
