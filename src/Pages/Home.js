import React from 'react';
import '../CSS/Home.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      map: 0
    }
  }

  play = () => {
    this.props.history.push({
      pathname: '/game'
    })
  }

  render() {
    return (
      <div className="home">
        <div className="titleCard">
          <h1>PUBGuessr</h1>
          <p>The PUBG map guessing game</p>
        </div>
        <div className="maps">
          <div></div>
          <div className="mapCard" id={this.state.map == 0 ? null : 'grey'}>
            <img className="mapPic" src={process.env.PUBLIC_URL + '/images/erangel_promo.jpg'} />
            <h1>Erangel</h1>
          </div>
          <div className="mapCard" id={this.state.map == 1 ? null : 'grey'}>
            <h1 id="soon">COMING SOON</h1>
            <img className="mapPic" src={process.env.PUBLIC_URL + '/images/miranmar_promo.jpg'} />
            <h1>Miramar</h1>
          </div>
          <div className="mapCard" id={this.state.map == 2 ? null : 'grey'}>
            <h1 id="soon">COMING SOON</h1>
            <img className="mapPic" src={process.env.PUBLIC_URL + '/images/sanhok_promo.jpg'} />
            <h1>Sanhok</h1>
          </div>
        </div>
        <button onClick={this.play} className="playBtn">PLAY</button>
      </div>
    )
  }
}

export default Home;
