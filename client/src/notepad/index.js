import React from 'react';
import NotePad from './notePad';
import NoteTitle from './NoteTitle';

export default class NotePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.changeBackgroundColor('#1F1F1F');
  }

  render = () => (
    <div>
      <NoteTitle />
      <NotePad { ...this.props } />
  </div>
  );
}
