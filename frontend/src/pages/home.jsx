import React, { Component } from 'react';
import Menubar from '../components/menubar';

const storageController = require('../controller/controller_storage');

// This App here is for routing purposes
class Home extends Component {
  constructor(props) {
    super(props);
    const { aesKey, rsaKey1, rsaKey2, firstTime } = storageController.getKeys();

    this.state = {
      aesKey,
      rsaKey1,
      rsaKey2,
      firstTime,
    }
  }

  // async componentDidMount() {
  //   console.log(aesKey);
  //   console.log(rsaKey1);
  //   console.log(rsaKey2);
  //   console.log(firstTime);
  //   console.log(firstTime);
  // }

  render() {
    return (
      <div>
        <Menubar
          history={this.props.history}
        />

        <h1>
          Hello world
        </h1>
      </div>
    );
  }
}

export default Home;