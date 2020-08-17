import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import '../css/menubar.css';

// This App here is for routing purposes
class Menubar extends Component {
  clickUpload() {
    this.props.history.push('/upload');
  }

  clickSearch() {
    this.props.history.push('/search');
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
              <img src="/thesis.png" alt="logo" id="logo-name" onClick={this.clickLogo.bind(this)}/>
            </Grid>
            <Grid item xs={2}>
              <img src="/voidlogo.png" alt="logo" id="logo" onClick={this.clickLogo.bind(this)}/>
            </Grid>
            
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={1}>
              <button className="menubarbutton" onClick={this.clickSearch.bind(this)}>
                <span>Search</span>
              </button>
            </Grid>
            <Grid item xs={1}>
              <button className="menubarbutton" onClick={this.clickUpload.bind(this)}>
                <span>Upload</span>
              </button>
            </Grid>
          </Grid>
        </div>

      </div>
    );
  }
}

export default Menubar;