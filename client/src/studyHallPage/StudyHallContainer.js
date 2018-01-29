import React from 'react';
import ChatConnected from './Chat';

export default class StudyHallContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => (
    <div>
      <h1>Study Hall</h1>
      <ChatConnected />
    </div>
  );
}