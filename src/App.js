import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Game from './Pages/Game.js';
import Nav from './Pages/Nav.js';
import Home from './Pages/Home.js'
import About from './Pages/About.js'
import Leaderboard from './Pages/Leaderboard.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav />
            <Route exact path='/' component={Home} />
            <Route path='/game' component={Game} />
            <Route path='/leaderboard' component={Leaderboard} />
            <Route path='/about' component={About} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
