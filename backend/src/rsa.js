const { BigInteger } = require("jsbn");

class RSAHandler {
  constructor(n, e) {
    this.e = new BigInteger(e, 16);
    this.n = new BigInteger(n, 16);
  }

  encrypt(hexedMessage) {
    const m = new BigInteger(hexedMessage, 16);
    const c = m.modPowInt(this.e, this.n);
    const res = c.toString(16);
    if ((res.length & 1) == 0) return res; else return "0" + res;
  }
}

module.exports = RSAHandler;