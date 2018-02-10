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
      turns: [],
      choices: ['red', 'green', 'blue', 'yellow'],
      currentMove: 0,
      isPlayersTurn: false,
      gameStatus: 'not started', // 'not started', 'showing prompt', 'player turn', 'game won', 'game lost'
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

    if (this.state.isPlayersTurn) this.checkIfCorrect(tile);
  }

  checkIfCorrect(tile) {
    const { currentMove, turns } = this.state;
    if (turns[currentMove] === tile && currentMove >= turns.length - 1) {
      console.log('ALL CORRECT, SETTING NEW TURN');
      this.setState({ gameStatus: 'game won' });
      setTimeout(() => this.addNextTurn(), 2000);
    } else if (turns[currentMove] !== tile) {
      console.log('HAHA YOU LOSE!');
      this.setState({
        turns: [],
        currentMove: 0,
        isPlayersTurn: false,
        gameStatus: 'game lost',
      });
      setTimeout(() => this.setState({ gameStatus: 'not started' }), 2000);
    } else {
      this.setState({ currentMove: currentMove + 1 });
    }
  }

  pickNextColor() {
    const randomIndex = Math.floor(Math.random() * this.state.choices.length);
    return this.state.choices[randomIndex];
  }

  addNextTurn() {
    const nextColor = this.pickNextColor();
    this.setState({
      turns: [...this.state.turns, nextColor],
      currentMove: 0,
      isPlayersTurn: false,
      gameStatus: 'showing prompt',
    });
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
          this.setState({
            isPlayersTurn: true,
            gameStatus: 'player turn',
          });
        }
      });
    });

    stagger.start();
  }

  showGameStatus() {
    const { gameStatus } = this.state;
    if (gameStatus === 'not started') return <h2>Waiting for the player to start the game</h2>;
    if (gameStatus === 'showing prompt') return <h2>Please wait till prompt finishes</h2>;
    if (gameStatus === 'player turn') return <h2>Your turn!</h2>;
    if (gameStatus === 'game won') return <h2>Nice, you got through that round!</h2>;
    if (gameStatus === 'game lost') return <h2>Congradulations! You lost!</h2>;
    return <h2>No Status to show</h2>;
  }

  handleSelectChange(e) {
    console.log('Select change:', e.target.value);
    this.setState({
      difficulty: e.target.value,
      turns: [],
      currentMove: 0,
    });
  }

  render() {
    return (
      <div>
        <select value={this.state.difficulty} onChange={this.handleSelectChange.bind(this)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
        </select>
        <button type="button" onClick={() => this.addNextTurn()}>Start Game</button>
        {this.showGameStatus()}
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
