import Home from './pages/home';
import Upload from './pages/upload';
import Page404 from './pages/page404';

import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

// This App here is for routing purposes
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/upload' component={Upload}/>
          <Route exact path='/*' component={Page404}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;