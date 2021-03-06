import React, { Component } from 'react';
import NotePreview from './notePreview';
import SearchBar from './searchBar';


export default class Notebox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      notes: this.props.notes,
      filteredNotes: this.props.notes,
    });
  }

  componentDidMount() {
    const currentUser = this.props.currentUser.userId;
    this.props.getNotes(currentUser);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      notes: nextProps.notes,
      filteredNotes: nextProps.notes,
    });
  }

  filterNotes = (value) => {
    if (value) {
      const filteredNotes = this.state.notes.filter(note => (
        note.body.toLowerCase().includes(value) ||
        note.title.toLowerCase().includes(value)
      ));
      this.setState({ filteredNotes });
    } else {
      this.setState({ filteredNotes: this.state.notes });
    }
  }

  render = () => (
    <div>
      <SearchBar
        filterNotes={ this.filterNotes }
      />
      {
        this.state.notes && this.state.filteredNotes.map(note =>
          <NotePreview
            title={ note.title || 'Untitled' }
            key={ note._id }
            noteId={ note._id }
            setCurrentNote={ this.props.setCurrentNote }
          />)
      }
      {
        /* <img
        src='./assets/folder.png'
        style='width: 200px'
      />
      <img
        src='./assets/folder.png'
        style='width: 200px'
      /> */
      }
      <div
        style={{
          backgroundImage: './assets/folder.png',
          width: '200px',
        }}
      >
        English 1302
      </div>
    </div>
  );
}
