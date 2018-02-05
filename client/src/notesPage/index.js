import React from 'react';
import { Grid } from 'semantic-ui-react';
import MainEditor from './mainEditor';
import NoteTitle from './NoteTitle';
import FileMenu from './fileMenu';
import IntelliSearch from './intelliSearch';

class NotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meaning: '',
      limit: 10,
    };
  }

  componentWillReceiveProps(newProps) {
    const { meaning, limit } = newProps;
    this.setState({
      meaning,
      limit,
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
          <NoteTitle />
          <MainEditor { ...this.props } handleTextChange={ this.handleTextChange } />
        </Grid.Column>
        <Grid.Column width={4}>
          <IntelliSearch meaning={ this.state.meaning } limit={ this.state.limit } />
        </Grid.Column>
      </Grid >
    </div>
  );
}

export default NotePage;
