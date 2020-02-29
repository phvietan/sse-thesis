import React, { Component } from 'react';
import { CryptoHandler } from '../cryptohandler/crypto'

// This App here is for routing purposes
class Home extends Component {
  render() {
    const key = CryptoHandler.GenerateRandomAESKey()
    const plaintext = 'Hello world';
    const encrypted = CryptoHandler.SymmetricEncrypt(key, plaintext)
    const decrypted = CryptoHandler.SymmetricDecrypt(key, encrypted)

    CryptoHandler.GenerateRandomAESKey()
    return (
      <div>
        <h1>
          Hello world
        </h1>
      </div>
    );
  }
}

export default Home;