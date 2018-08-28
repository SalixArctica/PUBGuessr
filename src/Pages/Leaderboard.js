import React from 'react';
import '../CSS/Leaderboard.css';

class Leaderboard extends React.Component {
  constructor() {
    super();
    this.state = {
      leaderboard: []
    }
  }

  componentDidMount = () => {
    fetch("http://localhost:5000/api/leaderboard")
    .then(res => res.json())
    .then(res => {
      this.setState({
        leaderboard: res.leaderboard
      }, () => {
        console.log(this.state);
      })
    })
  }

  renderEntry = (entry, index) => {
      return (
        <div className='leaderboardEntry'>
          <p>{index + 1}</p>
          <p className="lbName">{entry.name}</p>
          <p className="lbScore">{entry.score}</p>
        </div>
      )
  }

  render() {
    return (
      <div className="leaderboard">
        <h1>LeaderBoard</h1>
        <div>
          {this.state.leaderboard.map((entry, index) =>
            this.renderEntry(entry, index)
          )}
        </div>
      </div>
    )
  }
}

export default Leaderboard;
