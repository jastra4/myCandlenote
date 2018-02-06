import React, { Component } from 'react';
import NotePreview from './note';


export default class Notebox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const currentUser = this.props.currentUser.userId;
    this.props.getNotes(currentUser);
  }

  render = () => (
    <div>
      {
        this.props.notes.map(note =>
          <NotePreview
            { ...this.props }
            title={ note.title }
            key={ note._id }
          />)
      }
    </div>
  );
}
