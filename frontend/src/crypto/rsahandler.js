const jsbn = require("./jsbn/jsbn_allinone");
const util = require("./util");

function isValidRsaObject(obj) {
  return obj && obj.n && obj.e && obj.d && obj.p && obj.q && obj.dmp1 && obj.dmq1 && obj.coeff;
}

class RSAHandler {
  constructor(obj) {
    this.rsa = new jsbn.RSAKey();
    if (isValidRsaObject(obj)) {
      this.rsa.setPrivateEx(
        obj.n, obj.e, obj.d,
        obj.p, obj.q,
        obj.dmp1, obj.dmq1, obj.coeff,
      );
    } else {
      // Use exponent = 0x10001
      this.rsa.generate(1024, "10001");
    }
  }

  // message must be utf-8
  // returned ciphertext is hex
  encrypt(message) {
    const hexedMessage = util.stringToHex(message)
    return this.rsa.encrypt(hexedMessage);
  }

  // ciphertext must be hex
  // message will be utf-8
  decrypt(ciphertext) {
    const m = this.rsa.decrypt(ciphertext);
    return util.hexToString(m.toString(16));
  }

}

module.exports = {
  RSAHandler
}
