import React from 'react';

const ExtremeDifficulty = (props) => {
  return (
    <div className="box">
      {console.log('EXTREME DIFFICULTY LOADED')}
      {console.log('STATE:', props)}
      <div id="red-hard" className={props.redBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('red') : () => { }}>
      </div>
      <div id="green-hard" className={props.greenBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('green') : () => { }}>
      </div>
      <div id="blue-hard" className={props.blueBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('blue') : () => { }}>
      </div>
      <div id="yellow-hard" className={props.yellowBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('yellow') : () => { }}>
      </div>
      <div id="dog-extreme" className={props.yellowBlink} onClick={props.isPlayersTurn ? () => props.makeAnimalSound('dog') : () => { }}>
      </div>
      <div id="cat-extreme" className={props.yellowBlink} onClick={props.isPlayersTurn ? () => props.makeAnimalSound('cat') : () => { }}>
      </div>
      <div id="cow-extreme" className={props.yellowBlink} onClick={props.isPlayersTurn ? () => props.makeAnimalSound('cow') : () => { }}>
      </div>
    </div>
  );
}

export default ExtremeDifficulty;
