import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

export default class NotePreview extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  componentDidMount() {
    this.setState({ redirect: false });
    const modifiedAt = moment(this.props.modifiedAt);
    const modifiedDay = modifiedAt.format('MMM Do YYYY');
    const today = moment().format('MMM Do YYYY');
    const formattedTime = modifiedDay === today
      ? modifiedAt.fromNow()
      : modifiedAt.format('MMM Do YYYY');
    
    this.setState({ formattedTime });
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
        <div class='notePreview' onClick={ this.handleNoteChange }>
          <div className='notePreviewTitle'>{ this.props.title }</div>
          <div className='notePreviewDate'>Opened { this.state.formattedTime }</div>
        </div>
      )
  )
}

