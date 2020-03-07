const jsbn = require("./jsbn/jsbn_allinone");

function stringToHex(s) {
  return Buffer.from(s, 'utf8').toString('hex');
}

function hexToString(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }

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
    const hexedMessage = stringToHex(message)
    return this.rsa.encrypt(hexedMessage);
  }

  // ciphertext must be hex
  // message will be utf-8
  decrypt(ciphertext) {
    const m = this.rsa.decrypt(ciphertext);
    return hexToString(m.toString(16));
  }

  // static GenerateKey() {
  //   let rsa = new jsbn.RSAKey()
  //   rsa.generate(1024, "10001");
  //   console.log(rsa);
    
  //   console.log("n = ", rsa.n.toString(16));
  //   console.log("e = ", rsa.e.toString(16));
  //   console.log("d = ", rsa.d.toString(16));
  //   console.log("p = ", rsa.p.toString(16));
  //   console.log("q = ", rsa.q.toString(16));

  //   // const x = new jsbn.BigInteger("abcd1234", 16);
  //   // const y = new jsbn.BigInteger("beef", 16);
  //   // const z = x.add(y);
  //   // console.log(z.toString(16));

  //   const message = "test";
  //   const hexedMessage = stringToHex(message)
  //   console.log(hexedMessage);
  //   const c = rsa.encrypt(hexedMessage);
  //   console.log(c);
  //   const m = rsa.decrypt(c);
  //   console.log(m.toString(16));
  // }


}

module.exports = {
  RSAHandler
}
