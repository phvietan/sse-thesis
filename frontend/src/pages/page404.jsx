import React, { Component } from 'react';
const { initProgram } = require('../controller/protocol');

// This App here is for routing purposes
class Page404 extends Component {
  render() {
    initProgram();
    return (
      <div>
        <h1>
          Sorry this page is not available
        </h1>
      </div>
    );
  }
}

export default Page404;