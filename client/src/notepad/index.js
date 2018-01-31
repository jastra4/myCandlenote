import React from 'react';
import { Grid } from 'semantic-ui-react';
// import MainEditor from './mainEditor';
import NoteTitle from './NoteTitle';
import FileMenu from './fileMenu'; // eslint-disable-line 
// import IntelliSearch from './intelliSearch';

export default class NotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          {/* <MainEditor { ...this.props } handleTextChange={this.handleTextChange} /> */}
        </Grid.Column>
        <Grid.Column width={4}>
          <div>IntelliSearch Goes here :)</div>
        </Grid.Column>
      </Grid >
  </div>
  );
}
