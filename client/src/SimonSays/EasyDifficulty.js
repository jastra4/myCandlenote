import React from 'react';

const EasyDifficulty = props => (
  <div>
    {console.log('EASY DIFFICULTY LOADED')}
    {console.log('STATE:', props)}
    <div id="red-easy" className={props.redBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('red') : () => { }}>
    </div>
    <div id="green-easy" className={props.greenBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('green') : () => { }}>
    </div>
    <div id="blue-easy" className={props.blueBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('blue') : () => { }}>
    </div>
    <div id="yellow-easy" className={props.yellowBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('yellow') : () => { }}>
    </div>
  </div>
);

export default EasyDifficulty;
