import React from 'react';
import '../CSS/About.css';

const About = () => {
  return (
    <div className="About">
      <p>PUBGuessr is a project by <a onClick={() => window.open('https://github.com/Tankcaster', '_blank')}>Tankcaster</a></p>
      <p>Inspired by <a onClick={() => window.open('https://whereinfortnite.com/', '_blank')}>Where in Fortnite</a></p>
      <p>and of course <a onClick={() => window.open('https://geoguessr.com/', '_blank')}>Geoguessr</a></p>
      <p>font provided by <a onClick={() => window.open('http://www.kcfonts.com/', '_blank')}>KC Fonts</a></p>
      <p>High res maps from <a onClick={() => window.open('https://github.com/lonelytb', '_blank')}>lonelytb</a></p>
      <p>Awesome javascript map library <a onClick={() => window.open('https://leafletjs.com/', '_blank')}>leaflet</a></p>
    </div>
  )
}

export default About
