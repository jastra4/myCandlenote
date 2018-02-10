import React from 'react';
import './style.css';

export default class SimonSays extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redBlink: '',
      greenBlink: '',
      blueBlink: '',
      yellowBlink: '',
    };
  }

  makeTileBlink(tile) {
    const blinkActions = {
      red: () => this.setState({ redBlink: 'red-blink' }, () => setTimeout(() => this.setState({ redBlink: '' }), 200)),
      green: () => this.setState({ greenBlink: 'green-blink' }, () => setTimeout(() => this.setState({ greenBlink: '' }), 200)),
      blue: () => this.setState({ blueBlink: 'blue-blink' }, () => setTimeout(() => this.setState({ blueBlink: '' }), 200)),
      yellow: () => this.setState({ yellowBlink: 'yellow-blink' }, () => setTimeout(() => this.setState({ yellowBlink: '' }), 200)),
    };
    console.log('Blinking tile:', tile);
    blinkActions[tile]();
  }

  render() {
    return (
      <div>
        {console.log('STATE:', this.state)}
        <div id="red" className={this.state.redBlink} onClick={() => this.makeTileBlink('red')}>
        </div>
        <div id="green" className={this.state.greenBlink} onClick={() => this.makeTileBlink('green')}>
        </div>
        <div id="blue" className={this.state.blueBlink} onClick={() => this.makeTileBlink('blue')}>
        </div>
        <div id="yellow" className={this.state.yellowBlink} onClick={() => this.makeTileBlink('yellow')}>
        </div>
      </div>
    );
  }
}