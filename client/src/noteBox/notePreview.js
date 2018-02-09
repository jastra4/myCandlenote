import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const noteStyle = {
  position: 'relative',
  textAlign: 'center',
  width: '150px',
  height: '193px',
  float: 'left',
  marginLeft: '30px',
  cursor: 'pointer',
  maxWidth: '130px',
  overflow: 'hidden',
};

const imageStyle = {
  width: '100%',
  height: '100%',
};

const textStyle = {
  position: 'absolute',
  top: '-5%',
  left: '13%',
};


export default class NotePreview extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  componentDidMount() {
    this.setState({ redirect: false });
  }

  handleNoteChange = () => {
    const newCurrentNote = this.props.noteId;
    console.log('newCurrentNote: ', newCurrentNote);
    console.log('props hns: ', this.props);
    this.props.setCurrentNote(newCurrentNote);
    this.setState({ redirect: true });
  };

  render = () => (
    this.state.redirect
      ? <Redirect to='/notepad' />
      : (
        <div style={ noteStyle } onClick={ this.handleNoteChange }>
            <img src='/assets/notepad.png' style={ imageStyle } />
            <h2 style={ textStyle }>{ this.props.title }</h2>
        </div>
      )
  )
}

