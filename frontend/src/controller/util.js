function hexToBuffer(hexString) {
  if (hexString.length % 2 === 1) hexString = '0' + hexString;
  return Buffer.from(hexString, 'hex')
}

function bufferToHex(b) {
  return b.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

function stringToHex(s) {
  return Buffer.from(s, 'utf8').toString('hex');
}

function hexToString(str1) {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
}

function hexToBase64(str) {
  return Buffer.from(str, 'hex').toString('base64')
}

function base64ToHex(str) {
  return Buffer.from(str, 'base64').toString('hex')
}

function base64Decode(val) {
  try {
    return atob(val);
  } catch (_) {
    return "";
  }
}

const isString = (value) => (
  typeof value === 'string' || value instanceof String
);

module.exports = {
  bufferToHex,
  hexToBuffer,
  stringToHex,
  hexToString,
  hexToBase64,
  base64ToHex,
  base64Decode,
  isString,
}