function hexToBuffer(hexString) {
  return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
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


module.exports = {
  bufferToHex,
  hexToBuffer,
  stringToHex,
  hexToString,
}