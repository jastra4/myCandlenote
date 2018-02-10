import React from 'react';
import Promise from 'promise';
import Stagger from 'stagger';
import EasyDifficulty from './EasyDifficulty';
import MediumDifficulty from './MediumDifficulty';
import './style.css';

// const delay = timeSpan => new Promise(resolve => setTimeout(resolve(), timeSpan));

export default class SimonSays extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redBlink: '',
      greenBlink: '',
      blueBlink: '',
      yellowBlink: '',
      difficulty: 'easy',
      turns: ['red', 'green', 'blue', 'yellow'],
      choices: ['red', 'green', 'blue', 'yellow'],
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

  pickNextColor() {
    const randomIndex = Math.floor(Math.random() * this.state.choices.length);
    return this.state.choices[randomIndex];
  }

  addNextTurn() {
    const nextColor = this.pickNextColor();
    this.setState({ turns: [...this.state.turns, nextColor] });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.turns.length < this.state.turns.length) {
      this.playPrompt();
    }
  }

  playPrompt() {
    let counter = 0;
    const limit = this.state.turns.length;
    const stagger = new Stagger({
      requestsPerSecond: 0.5,
      maxRequests: 100,
    });
    this.state.turns.forEach((turn) => {
      stagger.push(() => {
        this.makeTileBlink(turn);
        counter += 1;
        if (counter >= limit) {
          console.log('THATS IT');
        }
      });
    });

    stagger.start();
  }

  render() {
    return (
      <div>
        <button type="button" onClick={() => this.addNextTurn()}>Add new turn</button>
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
