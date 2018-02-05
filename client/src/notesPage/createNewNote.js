import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

export default class CreateNewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNewNote = () => {
    this.props.createNote({
      title: 'My First Note',
      authorID: this.props.user.userId,
      createdAt: Date.now(),
    })
  }

  render = () => (
    <div>
      <Button onClick={ this.handleNewNote }>Create New Note</Button>
    </div>
  );
}
