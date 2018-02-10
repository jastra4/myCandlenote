import React from 'react';

const MediumDifficulty = (props) => {
  return (
    <div>
      {console.log('MEDIUM DIFFICULTY LOADED')}
      {console.log('STATE:', props)}
      <div id="red-medium" className={props.redBlink} onClick={() => props.makeTileBlink('red')}>
      </div>
      <div id="green-medium" className={props.greenBlink} onClick={() => props.makeTileBlink('green')}>
      </div>
      <div id="blue-medium" className={props.blueBlink} onClick={() => props.makeTileBlink('blue')}>
      </div>
      <div id="yellow-medium" className={props.yellowBlink} onClick={() => props.makeTileBlink('yellow')}>
      </div>
    </div>
  );
}

export default MediumDifficulty;