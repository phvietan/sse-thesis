import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Menubar from '../components/menubar';
import FileItem from '../components/fileitem';
import '../css/home.css';
import { Button } from '@material-ui/core';

import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

const { initProgram, requestFiles, deleteFile } = require('../controller/protocol');

// This App here is for routing purposes
class Home extends Component {
  constructor(props) {
    super(props);
    initProgram();
    this.state = {
      files: [],
      tab : 0,
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

  navigatorClick(dir) {
    if (this.state.tab + dir < 0) return;
    if ((this.state.tab+dir)*6 >= this.state.files.length) return;
    const tab = this.state.tab+dir;
    this.setState({ tab });
  }

  async clickDelete(fileId) {
    await deleteFile({ file_id: fileId });
    await this.updateFilesState();
  }

  render() {
    const currentFiles = this.state.files.slice(this.state.tab*6, this.state.tab*6 + 6);
    return (
      <div>
        <Menubar
          history={this.props.history}
        />

        <div id="main-content">
          <h1>
            Has uploaded: {this.state.files.length} files
          </h1>

          <div id="files-content">
            <Grid container spacing={3}>
              {currentFiles.map((f,index) => {
                return (
                  <FileItem
                    history={this.props.history}
                    key={`item-${index}`}
                    fileHash={f.file_hash}
                    fileId={f.file_id}
                    clickDelete={this.clickDelete.bind(this)}
                  />
                );
              })}
            </Grid>
            <div className="navigator-field">
              <Button className="navigator-button" onClick={this.navigatorClick.bind(this, -1)}> <AiFillCaretLeft/> </Button>
              <Button className="navigator-button" onClick={this.navigatorClick.bind(this, 1)}> <AiFillCaretRight/> </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;