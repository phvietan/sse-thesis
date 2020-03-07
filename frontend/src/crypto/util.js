function fromHexString(hexString) {
  return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}

function toHexString(b) {
  return b.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

module.exports = {
  toHexString,
  fromHexString,
}