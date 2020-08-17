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

      fileName: "",
      preview_file: "",
      preview_ciphertext: "",
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
    const fileInput = document.getElementById('file');

    const reader = new FileReader();
    reader.onload = async (e) => {
      const { EF, I } = this.state;
      const response = await uploadFile({ EF, I });
      console.log(response);
      // this.props.redirectHome();
    };
    reader.readAsDataURL(fileInput.files[0]);
  }

  async selectedFile(e) {
    const fileInput = e.target.files[0];
    const fileName = fileInput.name;

    const numFiles = await getNumberOfFile();
    const n = numFiles + 1;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const contentBase64 = e.target.result.split(',')[1];
      const content = util.base64Decode(contentBase64);

      const { EF, I } = this.createEncryptedFiles(content, n);
      this.setState({ 
        fileName,
        EF, I,
        preview_file: content,
        preview_ciphertext: EF,
      });
    };
    reader.readAsDataURL(fileInput);
  }

  render() {
    return (
      <div>
        <label>
            <h2 id="upload-file-button">Choose file</h2>
            <input type="file" id="file" onChange={this.selectedFile.bind(this)}/>
        </label>
        <h3>Choosing: {this.state.fileName === '' ? "Have not chose file" : this.state.fileName}</h3>

        <h3>Preview file content</h3>
        <textarea className="view-content encrypted-content" value={this.state.preview_file}>
        </textarea>

        <h3>Preview encrypted file content</h3>
        <textarea className="view-content encrypted-content" value={this.state.preview_ciphertext}>
        </textarea>

        <br/>
        <button onClick={this.encryptFile.bind(this)}>Encrypt and upload file</button>
      </div>
    );
  }
}

export default Uploadbar;