import React from 'react';

const ExtremeDifficulty = (props) => {
  return (
    <div className="box">
      <div id="red-extreme" className={props.redBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('red') : () => { }}>
      </div>
      <div id="green-extreme" className={props.greenBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('green') : () => { }}>
      </div>
      <div id="blue-extreme" className={props.blueBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('blue') : () => { }}>
      </div>
      <div id="yellow-extreme" className={props.yellowBlink} onClick={props.isPlayersTurn ? () => props.makeTileBlink('yellow') : () => { }}>
      </div>
      <div id="dog-extreme" className={props.yellowBlink} onClick={props.isPlayersTurn ? () => props.makeAnimalSound('dog') : () => { }}>
        <img src="/assets/dog.png" style={{ width: '7em', height: '7em' }}/>
      </div>
      <div id="cat-extreme" className={props.yellowBlink} onClick={props.isPlayersTurn ? () => props.makeAnimalSound('cat') : () => { }}>
        <img src="/assets/cat.png" style={{ width: '7em', height: '7em' }}/>
      </div>
      <div id="cow-extreme" className={props.yellowBlink} onClick={props.isPlayersTurn ? () => props.makeAnimalSound('cow') : () => { }}>
        <img src="/assets/cow.png" style={{width: '7em', height: '7em'}}/>
      </div>
    </div>
  );
}

export default ExtremeDifficulty;
