import React, { Component } from 'react';
import { AESHandler } from '../crypto/aeshandler.js';
import '../css/uploadbar.css';

const storageController = require('../controller/controller_storage');

class Uploadbar extends Component {
  constructor(props) {
    super(props);
    const { aesKey, rsaKey1, rsaKey2, firstTime } = storageController.getKeys();
    this.state = {
      aesKey,
      rsaKey1,
      rsaKey2,
      firstTime,
      instruction: "",
    }
  }

  encryptFile() {
    // const fileInput = document.getElementById('file');
    // const file = fileInput.files[0]
    // const reader = new FileReader();

    // const data = new FormData();
    // reader.onload = function(e) {
    //   const ciphertext = AESHandler.Encrypt(this.state.aesKey, e.target.result);
    //   data.append('file', ciphertext);
    //   data.append('rsa_n1', this.state.rsaKey1);
      
    //   console.log(ciphertext)
    // };
    // reader.readAsDataURL(file);
    console.log(this.state.rsaKey1.exportPublicKey());
  }

  render() {
    return (
      <div>
        <input type="file" id="file"/>
        <br/>
        <button onClick={this.encryptFile.bind(this)}>Encrypt and upload file</button>
      </div>
    );
  }
}

export default Uploadbar;