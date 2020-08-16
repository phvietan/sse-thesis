const jsbn = require("./jsbn/jsbn_allinone");

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

  encrypt(hexedMessage) {
    return this.rsa.encrypt(hexedMessage);
  }

  decrypt(ciphertext) {
    const m = this.rsa.decrypt(ciphertext);
    return m.toString(16);
  }

  exportPublicKey() {
    const n = this.rsa.n.toString(16);
    const e = this.rsa.e.toString(16);
    return { n, e }
  }
}

module.exports = {
  RSAHandler
}
