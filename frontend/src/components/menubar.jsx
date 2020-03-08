import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import '../css/menubar.css';

// This App here is for routing purposes
class Menubar extends Component {
  clickUpload() {
    this.props.history.push('/upload');
  }

  clickLogo() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <div id="menubar">
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <img src="/voidlogo.png" alt="logo" id="logo" onClick={this.clickLogo.bind(this)}/>
            </Grid>
            <Grid item xs={5}>
              <input type="text" placeholder="Search" className="searchbar"/>
            </Grid>
            <Grid item xs={5}>
              <button className="menubarbutton" onClick={this.clickUpload.bind(this)}>
                <span>Upload</span>
              </button>
              <div className="divider"></div>
              <button className="menubarbutton">
                <span>Profile</span>
              </button>
            </Grid>
          </Grid>
        </div>

      </div>
    );
  }
}

export default Menubar;