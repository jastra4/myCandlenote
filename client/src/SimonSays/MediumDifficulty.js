import React from 'react';

const MediumDifficulty = (props) => {
  return (
    <div>
      <div id="red-medium" className={props.redBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('red') : () => { }}>
      </div>
      <div id="green-medium" className={props.greenBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('green') : () => { }}>
      </div>
      <div id="blue-medium" className={props.blueBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('blue') : () => { }}>
      </div>
      <div id="yellow-medium" className={props.yellowBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('yellow') : () => { }}>
      </div>
    </div>
  );
}

export default MediumDifficulty;
