import React from 'react';
import Stagger from 'stagger';
import Sound from 'react-sound';
import EasyDifficulty from './EasyDifficulty';
import MediumDifficulty from './MediumDifficulty';
import HardDifficulty from './HardDifficulty';
import ExtremeDifficulty from './ExtremeDifficulty';
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
      turns: ['red', 'blue', 'green', 'yellow'],
      choices: ['red', 'green', 'blue', 'yellow'],
      currentMove: 0,
      isPlayersTurn: false,
      gameStatus: 'not started', // 'not started', 'showing prompt', 'player turn', 'game won', 'game lost'
      animalSound: '',
      soundStatus: 'STOPPED',
    };

    this.blinkActions = {
      red: () => this.setState({ redBlink: 'red-blink' }, () => setTimeout(() => this.setState({ redBlink: '' }), 200)),
      green: () => this.setState({ greenBlink: 'green-blink' }, () => setTimeout(() => this.setState({ greenBlink: '' }), 200)),
      blue: () => this.setState({ blueBlink: 'blue-blink' }, () => setTimeout(() => this.setState({ blueBlink: '' }), 200)),
      yellow: () => this.setState({ yellowBlink: 'yellow-blink' }, () => setTimeout(() => this.setState({ yellowBlink: '' }), 200)),
    };

    this.animals = ['dog', 'cat', 'cow'];
    this.animalSounds = {
      dog: () => this.setState({ animalSound: '/assets/dog_bark.mp3', soundStatus: 'PLAYING' },
        () => setTimeout(() => this.setState({ animalSound: '', soundStatus: 'STOPPED' }), 400)),
      cat: () => this.setState({ animalSound: '/assets/cat_meow.mp3', soundStatus: 'PLAYING' },
        () => setTimeout(() => this.setState({ animalSound: '', soundStatus: 'STOPPED' }), 700)),
      cow: () => this.setState({ animalSound: '/assets/cow_moo.mp3', soundStatus: 'PLAYING' },
        () => setTimeout(() => this.setState({ animalSound: '', soundStatus: 'STOPPED' }), 900)),
    };

    this.makeTileBlink = this.makeTileBlink.bind(this);
    this.makeAnimalSound = this.makeAnimalSound.bind(this);
  }

  makeTileBlink(tile) {
    console.log('Blinking tile:', tile);
    this.blinkActions[tile]();

    if (this.state.isPlayersTurn) this.checkIfCorrect(tile);
  }

  makeAnimalSound(animal) {
    console.log('Making animal sound:', animal);
    this.animalSounds[animal]();

    if (this.state.isPlayersTurn) this.checkIfCorrect(animal);
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

  pickNextChoice() {
    const choices = [...this.state.choices];
    if (this.state.difficulty === 'extreme') choices.push('dog', 'cat', 'cow');
    const randomIndex = Math.floor(Math.random() * choices.length);
    console.log('CHOICES:', choices);
    return choices[randomIndex];
  }

  addNextTurn() {
    const nextColor = this.pickNextChoice();
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
    const rates = {
      easy: 0.8,
      medium: 1.4,
      hard: 2,
      extreme: 1,
    };
    let counter = 0;
    const limit = this.state.turns.length;
    const stagger = new Stagger({
      requestsPerSecond: rates[this.state.difficulty],
      maxRequests: 100,
    });
    this.state.turns.forEach((turn) => {
      stagger.push(() => {
        if (this.state.gameStatus !== 'showing prompt') {
          stagger.stop();
          return;
        }
        if (this.animals.includes(turn)) this.makeAnimalSound(turn);
        else this.makeTileBlink(turn);
        counter += 1;
        if (counter >= limit) {
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
    this.setState({
      difficulty: e.target.value,
      turns: [],
      currentMove: 0,
      isPlayersTurn: false,
      gameStatus: 'not started',
    });
  }

  render() {
    return (
      <div>

        <Sound
          url={this.state.animalSound}
          playStatus={this.state.soundStatus}
          volume={50}
          playFromPosition={this.state.animalSound.includes('cow') ? 200 : 0 }
        />

        <select value={this.state.difficulty} onChange={this.handleSelectChange.bind(this)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="extreme">Extreme</option>
        </select>
        <button type="button" onClick={() => this.addNextTurn()}>Start Game</button>
        {this.showGameStatus()}
        {(() => {
          if (this.state.difficulty === 'easy') return <EasyDifficulty {...this.state} makeTileBlink={this.makeTileBlink} />;
          else if (this.state.difficulty === 'medium') return <MediumDifficulty {...this.state} makeTileBlink={this.makeTileBlink} />;
          else if (this.state.difficulty === 'hard') return <HardDifficulty {...this.state} makeTileBlink={this.makeTileBlink} />;
          else if (this.state.difficulty === 'extreme') {
            return <ExtremeDifficulty
              {...this.state}
              makeTileBlink={this.makeTileBlink}
              makeAnimalSound={this.makeAnimalSound}
            />;
          }
          return <div>No Difficulty Selected</div>;
        })()
        }
      </div>
    );
  }
}
