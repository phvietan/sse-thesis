import React, { Component } from 'react';
import Menubar from '../components/menubar';

const { requestFiles } = require('../controller/protocol');

// This App here is for routing purposes
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  async updateFilesState() {
    const response = await requestFiles();
    const { result: files } = response; 
    this.setState({ files });
  }

  async componentDidMount() {
    await this.updateFilesState();
    setInterval(async() => { await this.updateFilesState(); }, 1000 * 30);
  }

  render() {
    return (
      <div>
        <Menubar
          history={this.props.history}
        />

        <div id="main-content">
          <h1>
            Has uploaded: {this.state.files.length} files
          </h1>
        </div>
      </div>
    );
  }
}

export default Home;