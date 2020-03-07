// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';

import { AESHandler } from './crypto/aeshandler.js';
import { RSAHandler } from './crypto/rsahandler.js';

// Expect document: https://jestjs.io/docs/en/expect

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
  const ciphertext = key.encrypt(plaintext);
  const decrypted = key.decrypt(ciphertext);
  expect(plaintext).toBe(decrypted);
});