import React from 'react';
import Canvas from './canvas';
import MenuBar from './menuBar';

export default class Notepad extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render = () => (
    <div>
      <MenuBar />
      haha
      <Canvas />
    </div>
  );
}

// style={{ maxWidth: "80%" }}/>
