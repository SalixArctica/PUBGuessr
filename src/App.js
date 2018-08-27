import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Game from './Pages/Game.js';
import Nav from './Pages/Nav.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav />
            <Route path='/' component={Game} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
