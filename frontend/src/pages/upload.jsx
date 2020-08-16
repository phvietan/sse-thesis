import React, { Component } from 'react';
import Menubar from '../components/menubar';
import Uploadbar from '../components/uploadbar';
import '../css/upload.css';

const storageController = require('../controller/controller_storage');

class Upload extends Component {
  constructor(props) {
    super(props);
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