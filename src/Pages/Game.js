import React from 'react';
import { Pannellum } from '360-react-pannellum';
import { Map, ImageOverlay, TileLayer, Marker, Popup } from 'react-leaflet'
import '../CSS/Game.css';
import DragScroll from 'react-dragscroll';
import Modal from 'react-modal';
const Leaflet = require('leaflet');


const locations = [
    {
      id: 0,
      lat: 6341,
      lng: 2091
    },
    {
      id: 1,
      lat: 4221,
      lng: 5575
    },
    {
      id: 2,
      lat: 4248,
      lng: 5223
    }
];

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      round: 1,
      score: 0,
      name: null,
      points: 0,
      guess: {
        lat: -200000,
        lng: -200000,
      },
      location: {
        lat: 6341,
        lng: 2091
      },
      distance: 0,
      modalIsOpen: false,
      endScreen: false
    }
  }

  endGame = () => {
    this.setState({
      modalIsOpen: false,
      endScreen: true,
    })
  }

  submitLeaderboard = () => {
    fetch('http://localhost:5000/api/leaderboard', {
      method: 'POST',
      body: {
        name: this.state.name,
        score: this.state.score
      }
    })
    .then(res => res.status == 200 ? this.props.history.push({ pathname: '/leaderboard'}) : null )
  }

  renderRightButton = () => {
    if(this.state.round == 5) {
      return (
        <button onClick={this.endGame}>Post to leaderboard</button>
      )
    }
    else {
      return (
        <button onClick={this.newRound} id="buttonStyle">Next Round</button>
      )
    }
  }

  newRound = () => {
    let nextId = Math.round(Math.random() * (locations.length - 1))
    this.setState({
      id: nextId,
      round: this.state.round + 1,
      location: {
        lat: locations[nextId].lat,
        lng: locations[nextId].lng
      },
      guess: {
        lat: -200000,
        lng: -200000,
      }
    })
    this.closeModal();
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  getDistance = () => {
    let guess = this.state.guess;
    let answer = this.state.location;
    let d = Math.sqrt(Math.pow((answer.lat - guess.lat), 2) + Math.pow((answer.lng - guess.lng), 2));
    return d;
  }

  makeGuess = (event) => {
    console.log(event.latlng)
    this.setState({guess: event.latlng})
  }

  submitGuess = () => {
    this.setState({
      distance: this.getDistance(),
      points: this.getPoints(),
      score: this.state.score + this.getPoints(),
      modalIsOpen: true
    })
  }

  getPoints = () => {
    let d = this.getDistance();
    let points;
    let perc = 1 - d/2000;
    if(perc < 0) {
      return 0;
    }
    else {
      return Math.round(perc * 20000);
    }
  }

  render() {
    const bounds = [[0, 0], [8000, 8000]]
    return (
      <div className="game">
        <div className="parent360">
          <DragScroll className="pic360" width='100%' height='75vh'>
            <img src={process.env.PUBLIC_URL + '/images/panorama' + this.state.id + '.jpg'} />
          </DragScroll>
        </div>
        <div className="mapDiv">
          <Map id="Map" className="Map"
            crs={ Leaflet.CRS.Simple }
            zoom={4}
            maxZoom={2}
            minZoom={-5}
            onClick={this.makeGuess}
            bounds={bounds}
            position={[500, 500]}
          >
            <ImageOverlay url={process.env.PUBLIC_URL + '/images/erangel_map.jpg'} bounds={ bounds } />
              <Marker position={this.state.guess}/>
          </Map>
          <button id="buttonStyle" className={ this.state.guess.lat == -200000 && this.state.guess.lng == -200000 ? 'inactive' : null} onClick={this.submitGuess}>Make Guess</button>
        </div>
        <div className="gameInfo">
          <div>
            <h1>Score: {this.state.score}</h1>
          </div>
          <div className="info2">
            <h1>Round: {this.state.round} of 5</h1>
          </div>
        </div>
        <div>
          <Modal
            className="Modal"
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="round end"
          >
            <h1>Your guess was {Math.round(this.state.distance).toLocaleString('en')} meters away</h1>
            <h1>Earning you {this.state.points.toLocaleString('en')} points</h1>
            {this.renderRightButton()}
          </Modal>
          <Modal
            className="Modal"
            isOpen={this.state.endScreen}
            contentLabel="game over"
          >
          <div className="endModal">
            <div className="endTitle">
              <h1>GG!</h1>
              <h1>FINAL SCORE: {this.state.score}</h1>
            </div>
            <h1>Enter your name for leaderboard</h1>
            <input value={this.state.name} onChange={(evt) => this.setState({name: evt.target.value})} type="text"/>
            <button onClick= {this.submitLeaderboard}>Submit</button>
            <button
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
          </div>
        </Modal>
        </div>
      </div>
    )
  }
}

export default Game;
