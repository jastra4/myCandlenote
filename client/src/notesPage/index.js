import React from 'react';
import { Grid } from 'semantic-ui-react';
import MainEditor from './mainEditor';
import NoteTitle from './NoteTitle';
import FileMenu from './fileMenu';
import CreateNewNote from './createNewNote';
import IntelliSearch from './intelliSearch';

class NotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      clearNote: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { meaning, limit, currentNote, notes } = newProps;
    this.setState({
      meaning,
      limit,
      currentNote,
      notes,
    });
  }

  componentDidMount() {
    const { currentNote } = this.props;
    const currentNoteObj = this.props.notes[currentNote];
    let content = '';
    let title = '';

    if (currentNoteObj && currentNoteObj.body) {
      content = JSON.parse(currentNoteObj.body);
    }
    if (currentNoteObj) {
      title = currentNoteObj.title; // eslint-disable-line
    }

    currentNote && this.setState({
      currentNote,
      title,
      content,
    });

    this.props.changeBackgroundColor('#1F1F1F');
  }

  handleTextChange = (content) => {
    this.setState({ content });
    this.props.editNote({
      noteId: this.props.currentNote,
      body: content,
      authorID: this.props.currentUser.userId,
    });
  }

  handleTitleChange = (title) => {
    this.setState({ title });
    this.props.editNote({
      noteId: this.props.currentNote,
      title,
      authorID: this.props.currentUser.userId,
    });
  }

  handleCreateNewNote = () => {
    console.log('handleNew!');
    this.props.createNote({
      authorID: this.props.currentUserId,
      createdAt: Date.now(),
    });
    this.setState({ clearNote: true });
  }

  resetClear = () => {
    this.state.clearNote = false;
  }

  handleDelete = () => {
    this.props.deleteNote(this.props.currentNote);
    this.setState({ 
      clearNote: true,
      currentNote: '',
     });
  }

  componentWillUnmount() {
    if (this.state.body || this.state.content) {
      this.props.editNote({
        noteId: this.props.currentNote,
        title: this.state.title,
        body: this.state.content,
        authorID: this.props.currentUser.userId,
      });
    }
  }

  render = () => (
    <div>
      <Grid >
        <Grid.Column width={12}>
          <FileMenu
            currentUserId={ this.props.currentUser.userId }
            createNote={ this.props.createNote }
            handleCreateNewNote={ this.handleCreateNewNote }
            handleDelete={ this.handleDelete }
          />
          {
            !this.state.currentNote &&
            <CreateNewNote { ...this.props } />
          }
          {
            this.state.currentNote &&
            <div>
              <NoteTitle
                handleTitleChange={ this.handleTitleChange }
                title={ this.state.title }
                createNote={ this.props.createNote }
                clearNote={ this.state.clearNote }
                resetClear={ this.resetClear }
              />
              <MainEditor
                { ...this.props }
                handleTextChange={ this.handleTextChange }
                title={ this.state.title }
                content={ this.state.content }
                clearNote={ this.state.clearNote }
                resetClear={ this.resetClear }
              />
            </div>
          }
        </Grid.Column>
        <Grid.Column width={4}>
          <IntelliSearch meaning={ this.state.meaning } limit={ this.state.limit } />
        </Grid.Column>
      </Grid >
    </div>
  );
}

export default NotePage;
