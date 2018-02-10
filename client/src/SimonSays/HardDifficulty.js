import React from 'react';

const MediumDifficulty = (props) => {
  return (
    <div className="box">
      {console.log('HARD DIFFICULTY LOADED')}
      {console.log('STATE:', props)}
      <div id="red-hard" className={props.redBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('red') : () => { }}>
      </div>
      <div id="green-hard" className={props.greenBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('green') : () => { }}>
      </div>
      <div id="blue-hard" className={props.blueBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('blue') : () => { }}>
      </div>
      <div id="yellow-hard" className={props.yellowBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('yellow') : () => { }}>
      </div>
    </div>
  );
}

export default MediumDifficulty;
