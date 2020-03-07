import React, { Component } from 'react';

const utils = require('../controller/controller_storage');

// This App here is for routing purposes
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicKey: '',
      privateKey: '',
    }
  }

  async componentDidMount() {
    const { aesKey, rsaKey1, rsaKey2, firstTime } = utils.getKeys();
    console.log(aesKey);
    console.log(rsaKey1);
    console.log(rsaKey2);
    console.log(firstTime);
    console.log(firstTime);
  }

  render() {
    return (
      <div>
        <h1>
          Hello world
        </h1>
      </div>
    );
  }
}

export default Home;