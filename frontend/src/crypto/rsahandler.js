const jsbn = require("./jsbn/jsbn_allinone");

class RSAHandler {
  static GenerateKey() {
    let rsa = new jsbn.RSAKey()
    rsa.generate(1024, "65535");
    console.log(rsa);
    console.log(rsa.n.toString(16));
    
  }
}

module.exports = {
  RSAHandler
}
