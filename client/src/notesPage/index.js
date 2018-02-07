import React from 'react';
import { Grid } from 'semantic-ui-react';
import _ from 'lodash';
import MainEditor from './mainEditor';
import NoteTitle from './NoteTitle';
import FileMenu from './fileMenu';
import CreateNewNote from './createNewNote';
import IntelliSearch from './intelliSearch';

class NotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { limit: 10 };
    this.editNote = _.debounce(this.editNote, 2000);
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

  componentWillMount() {
    this.props.changeBackgroundColor('#1F1F1F');

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
  }

  handleTextChange = (content) => {
    console.log('htc run!');

    this.setState({ content });
    this.editNote({
      noteId: this.props.currentNote,
      body: content,
    });
  }

  handleTitleChange = (title) => {
    this.setState({ title });
    this.editNote({
      noteId: this.props.currentNote,
      title,
    });
  }

  editNote = (noteInfo) => {
    this.props.editNote(noteInfo);
  }

  render = () => (
    <div>
      <Grid >
        <Grid.Column width={12}>
          <FileMenu />
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
              />
              <MainEditor
                { ...this.props }
                handleTextChange={ this.handleTextChange }
                title={ this.state.title }
                content={ this.state.content }
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
