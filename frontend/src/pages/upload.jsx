import React, { Component } from 'react';
import Menubar from '../components/menubar';
import { AESHandler } from './crypto/aeshandler.js';

const storageController = require('../controller/controller_storage');

// This App here is for routing purposes
function encryptFile() {
	const fileInput = document.getElementById('file');
	const file = fileInput.files[0]
	const reader = new FileReader();
	const { aesKey } = storageController.getKeys();
	reader.onload = function(e) {
		document.getElementById('wait').innerHTML="Please Wait Encrypting";
		const ciphertext = AESHandler.Encrypt(aesKey, e.target.result);
		document.getElementById('wait').innerHTML="File Encryption Finished";
    console.log([ciphertext]);
    
		const data = new FormData($("#fileinfo")[0]);
		const encryptedFile = new File([encrypted], file.name + '.encrypted', {type: "text/plain", lastModified: new Date()});
		data.append('file[0]', encryptedFile);
    document.getElementById('wait').innerHTML= "File Upload Starting";
    
		
	};
	reader.readAsDataURL(file);
}

class Upload extends Component {
  constructor(props) {
    super(props);
    // const { aesKey, rsaKey1, rsaKey2, firstTime } = storageController.getKeys();

    // this.state = {
    //   aesKey,
    //   rsaKey1,
    //   rsaKey2,
    //   firstTime,
    // }
  }

  render() {
    return (
      <div>
        <Menubar
          history={this.props.history}
        />

        <h1>
          You are about to upload file
        </h1>
      </div>
    );
  }
}

export default Upload;