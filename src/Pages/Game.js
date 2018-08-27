import React from 'react';
import { Pannellum } from '360-react-pannellum';
import { Map, ImageOverlay, TileLayer, Marker, Popup } from 'react-leaflet'
import '../CSS/Game.css';
import DragScroll from 'react-dragscroll';
const Leaflet = require('leaflet');


class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      guess: {
        lat: 0,
        lng: 0,
      },
      location: {
        lat: 6341,
        lng: 2091
      },
      distance: 0
    }
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
      distance: this.getDistance()
    })
  }

  render() {
    const bounds = [[0, 0], [8000, 8000]]
    return (
      <div className="game">
        <DragScroll className="pic360" width='100%' height='425px'>
          <img src={process.env.PUBLIC_URL + '/images/panorama3.jpg'} />
        </DragScroll>
        <div className="mapDiv">
          <Map className="Map"
            onClick={this.makeGuess}
            crs={ Leaflet.CRS.Simple }
            bounds={bounds}
            position={[500, 500]}
            zoom={15}
          >
            <ImageOverlay url={process.env.PUBLIC_URL + '/images/erangel_map.jpg'} bounds={ bounds } />
              <Marker position={this.state.guess}/>
          </Map>
          <button className={ this.state.guess.lat == 0 && this.state.guess.lng == 0 ? 'inactive' : null} onClick={this.submitGuess}>Make Guess</button>
        </div>
        <div>
          <h1>Your guess was {this.state.distance} meters away</h1>
        </div>
      </div>
    )
  }
}

export default Game;
