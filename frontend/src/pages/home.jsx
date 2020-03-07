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
    const key = new RSAHandler();
    const plaintext = 'Hello world';
    const encrypted = key.encrypt(plaintext);
    console.log(encrypted);
    const decrypted = key.decrypt(encrypted);
    console.log(decrypted);
  }

  render() {
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