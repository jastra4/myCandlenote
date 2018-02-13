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
      <div id='test1' class='testDiv'>
        <div className='notePreviewTitle'>On the Origins of War and Peace</div>
        <div className='notePreviewDate'>Opened Feb 12, 2018</div>
      </div>
      <div id='test2' class='testDiv'>The Art of War</div>
      <div id='test3' class='testDiv'>On Truth and Falsity</div>
      
    </div>
  );
}
