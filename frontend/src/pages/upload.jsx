import React, { Component } from 'react';
import Menubar from '../components/menubar';
import Uploadbar from '../components/uploadbar';
import '../css/upload.css';

class Upload extends Component {
  constructor(props) {
    super(props);
  }

  redirectHome() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <Menubar
          history={this.props.history}
        />
        
        <div id="main-content">
          <h1>Upload file</h1>
          <Uploadbar
            redirectHome={this.redirectHome.bind(this)}
          />
        </div>

      </div>
    );
  }
}

export default Upload;