import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateCurrentNote } from '../actions/notesActions';


class CreateNewNote extends Component {
  handleNewNote = () => {
    this.props.createNote({
      authorID: this.props.currentUser.userId,
      createdAt: Date.now(),
    });
  }

  render = () => (
    <div>
      <Button onClick={ this.handleNewNote }>Create New Note</Button>
    </div>
  );
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => (
  { updateCurrentNote: nodeId => dispatch(updateCurrentNote(nodeId)) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNewNote);
