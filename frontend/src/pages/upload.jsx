import React, { Component } from 'react';
import Menubar from '../components/menubar';
import Uploadbar from '../components/uploadbar';
import '../css/upload.css';

const storageController = require('../controller/controller_storage');

class Upload extends Component {
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

  render() {
    return (
      <div>
        <Menubar
          history={this.props.history}
        />

        <br/>
        <Uploadbar/>

      </div>
    );
  }
}

export default Upload;