import React, { Component } from 'react';
import Menubar from '../components/menubar';
import '../css/view.css';
import { AESHandler } from '../crypto/aeshandler.js';
import { Button } from '@material-ui/core';

const util = require('../controller/util');
const { getKeys } = require('../controller/controller_storage');

const { viewFile, deleteFile } = require('../controller/protocol');

// This App here is for routing purposes
class View extends Component {
  constructor(props) {
    super(props);
    this.fileHash = props.location.pathname.slice(6);
    
    this.state = {
      encryptedContent: '',
      content: '',
      plaintext: '',
      ciphertext: '',
      error: '',
      status: -1,
    }
  }

  async componentDidMount() {
    const response = await viewFile(this.fileHash);

    if (response.status === 200) {
      const ciphertext = util.base64ToHex(response.result);

      const { aesKey } = getKeys();
      const plaintext = AESHandler.Decrypt(aesKey, ciphertext);

      this.setState({
        status: response.status,
        ciphertext: response.result,
        plaintext,
      });
    } else {
      this.setState({
        error: response.error,
        status: response.status,
      })
    }
  }

  render() {
      return (
      <div>
        <Menubar
          history={this.props.history}
        />

        <div id="main-content">
          <h1 className="view-title">
            Viewing file:
          </h1>
          <p className="view-title view-id">{this.fileHash}</p>
          {/* <Button className="view-title view-title-button" onClick={this.clickDelete.bind(this)}>Delete?</Button> */}

          {this.state.status === -1 ? <h1>Loading...</h1> : 
            this.state.status === 200 ? (
              <div>
                <h1>Encrypted content on server</h1>
                <textarea className="view-content encrypted-content" value={this.state.ciphertext}>
                </textarea>

                <h1>Real content after decrypted</h1>
                <textarea className="view-content decrypted-content" value={this.state.plaintext}>
                </textarea>
              </div>
            ) : (
              <div>
                <h1>Error when getting file</h1>
                <h3 className="view-error">Error = {this.state.error}</h3>
                <h3 className="view-error">Status code = {this.state.status}</h3>
              </div>
            )
          }
          

        </div>

      </div>
    );
  }
}

export default View;