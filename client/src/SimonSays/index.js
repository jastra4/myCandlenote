import React from 'react';
import EasyDifficulty from './EasyDifficulty';
import MediumDifficulty from './MediumDifficulty';
import './style.css';

export default class SimonSays extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redBlink: '',
      greenBlink: '',
      blueBlink: '',
      yellowBlink: '',
      difficulty: 'easy',
    };

    this.makeTileBlink = this.makeTileBlink.bind(this);
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
        {(() => {
          if (this.state.difficulty === 'easy') return <EasyDifficulty {...this.state} makeTileBlink={this.makeTileBlink} />;
          else if (this.state.difficulty === 'medium') return <MediumDifficulty {...this.state} makeTileBlink={this.makeTileBlink} />;
          return <div>No Difficulty Selected</div>;
        })()
        }
      </div>
    );
  }
}
