import React, { Component } from 'react';
import NotePreview from './notePreview';


export default class Notebox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState({ notes: this.props.notes });
  }

  componentDidMount() {
    const currentUser = this.props.currentUser.userId;
    this.props.getNotes(currentUser);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ notes: nextProps.notes });
  }

  render = () => (
    <div>
      {
        this.state.notes && this.state.notes.map(note =>
          <NotePreview
            title={ note.title || 'Untitled' }
            key={ note._id }
            noteId={ note._id }
            setCurrentNote={ this.props.setCurrentNote }
          />)
      }
    </div>
  );
}
