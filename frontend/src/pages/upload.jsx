import React, { Component } from 'react';
import Menubar from '../components/menubar';

const storageController = require('../controller/controller_storage');

// This App here is for routing purposes
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