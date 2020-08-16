// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';

import { AESHandler } from './crypto/aeshandler.js';
import { RSAHandler } from './crypto/rsahandler.js';

const util = require('./controller/util'); 

test('aes handler', () => {
  const key = AESHandler.GenerateKey();
  const plaintext = "Some plaintext";
  const encrypted = AESHandler.Encrypt(key, plaintext);
  const decrypted = AESHandler.Decrypt(key, encrypted);
  expect(plaintext).toBe(decrypted);
});

test('rsa handler', () => {
  const key = new RSAHandler();
  const plaintext = 'Hello world';
  const hexedPlaintext = util.stringToHex(plaintext);
  const ciphertext = key.encrypt(hexedPlaintext);
  const decrypted = key.decrypt(ciphertext);

  console.log(hexedPlaintext);
  console.log(decrypted);

  expect(hexedPlaintext).toBe(decrypted);
  
  const revert = key.decrypt(hexedPlaintext);
  const normal = key.encrypt(revert);
  expect(hexedPlaintext).toBe(normal);
});

test('conversionHexToBuffer', () => {
  const str = 'aaba';
  const buf = util.hexToBuffer(str)
  expect(buf.length).toBe(2);

  // a = 10; b = 11
  expect(buf[0]).toBe(10 * 16 + 10);
  expect(buf[1]).toBe(11 * 16 + 10);

  const str2 = 'aabcc';
  const buf2 = util.hexToBuffer(str2)
  expect(buf2.length).toBe(3);
  
  // a = 10; b = 11; c = 12
  expect(buf2[0]).toBe(10);
  expect(buf2[1]).toBe(10 * 16 + 11);
  expect(buf2[2]).toBe(12 * 16 + 12);

  const str_again = util.bufferToHex(buf);
  expect(str).toBe(str_again);

  const str_again2 = util.bufferToHex(buf2);
  expect(str2).not.toBe(str_again2);
});