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
    };
  }

  componentWillReceiveProps(newProps) {
    console.log('newPrp')
    const { meaning, limit, currentNote } = newProps;
    this.setState({
      meaning,
      limit,
      currentNote,
    });
  }

  componentWillMount() {
    this.props.changeBackgroundColor('#1F1F1F');
  }

  handleTextChange = (content) => {
    this.setState({ content });
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
              <NoteTitle />
              <MainEditor { ...this.props } handleTextChange={ this.handleTextChange } />
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
