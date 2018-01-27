import React from 'react';
import Chat from './Chat.js';

export default class StudyHallContainer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render = () => (
    <div>
      <h1>Study Hall</h1>
      <Chat />
    </div>
  );
}