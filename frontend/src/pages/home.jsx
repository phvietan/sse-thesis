import React, { Component } from 'react';
import { AESHandler } from '../crypto/aeshandler.js';
import { RSAHandler } from '../crypto/rsahandler.js';

// This App here is for routing purposes
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicKey: '',
      privateKey: '',
    }
  }

  async componentDidMount() {
    const key = RSAHandler.GenerateKey(10, 10);
    console.log(key);
  }

  render() {
    const key = AESHandler.GenerateKey()
    const plaintext = 'Hello world';
    const encrypted = AESHandler.Encrypt(key, plaintext);
    const decrypted = AESHandler.Decrypt(key, encrypted);

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