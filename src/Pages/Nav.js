import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Nav.css'

const Nav = () => {
  return (
    <div className="nav">
      <div className="brand">
        <h1>PUBG</h1>
        <p>uessr</p>
      </div>
      <div className="links">
        <Link to='/game'>Play</Link>
        <Link to='/leaderboard'>LeaderBoard</Link>
        <Link to='/about'>About</Link>
      </div>
    </div>
  )
}

export default Nav;
