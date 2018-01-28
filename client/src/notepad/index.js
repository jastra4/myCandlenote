import React from 'react';
import { Grid } from 'semantic-ui-react';
import NotePad from './notePad';
import NoteTitle from './NoteTitle';
import FileMenu from './fileMenu';
import IntelliSearch from './intelliSearch';

export default class NotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.changeBackgroundColor('#1F1F1F');
  }

  render = () => (
    <div>
      <Grid >
        <Grid.Column width={12}>
          <FileMenu />
          <NoteTitle />
          <NotePad { ...this.props } />
        </Grid.Column>
        <Grid.Column width={4}>
          <IntelliSearch />
        </Grid.Column>
      </Grid >
  </div>
  );
}
