import React, { Component } from 'react';
import { AESHandler } from '../crypto/aeshandler.js';
import '../css/uploadbar.css';

const util = require('../controller/util');
const { transformBatch } = require('../controller/transformer');
const { getKeys } = require('../controller/controller_storage');
const { requestFiles, uploadFile } = require('../controller/protocol');

async function getNumberOfFile() {
  const response = await requestFiles();
  const { result: files } = response; 
  return files.length;
}

class Uploadbar extends Component {
  constructor(props) {
    super(props);
    const { aesKey, rsaKey1, rsaKey2, firstTime } = getKeys();
    this.state = {
      aesKey,
      rsaKey1,
      rsaKey2,
      firstTime,
      instruction: "",
    };
  }

  createEncryptedFiles(content, n) {
    // Get EF file
    const EFHex = AESHandler.Encrypt(this.state.aesKey, content);
    const EF = util.hexToBase64(EFHex);
  
    // Get I file
    const I = transformBatch(content, n, this.state.rsaKey1, this.state.rsaKey2, this.state.aesKey);
    return { EF, I };
  }
  
  async encryptFile() {
    const numFiles = await getNumberOfFile();
    const n = numFiles + 1;

    const fileInput = document.getElementById('file');

    const reader = new FileReader();
    reader.onload = async (e) => {
      const contentBase64 = e.target.result.split(',')[1];
      const content = util.base64Decode(contentBase64);

      const body = this.createEncryptedFiles(content, n);
      const response = await uploadFile(body);
      console.log(response);
    };
    reader.readAsDataURL(fileInput.files[0]);
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