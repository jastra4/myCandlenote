import React from 'react';
import _ from 'lodash';
import './NoteTitle.css';

export default class NoteTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleTitleChange = _.debounce(this.handleTitleChange, 1000);
  }

  componentDidMount() {
    const value = this.props.title || '';
    this.setState({ value });
  }


  componentWillReceiveProps(nextProps) {
    nextProps.clearNote && this.setState({
      value: '',
      clearNote: true,
    });
    _.defer(this.setState.bind(this), { clearNote: false });
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({ value });
    
    this.handleTitleChange({
      noteId: this.props.currentNote,
      title: value,
    });
  }

  handleTitleChange = (noteInfo) => { this.props.editNote(noteInfo); }
  
  componentWillUnmount() {
    this.handleTitleChange({
      noteId: this.props.currentNote,
      title: this.state.value,
    });
  }


  render = () => (
    <div >
      <input
        className='titleInput'
        value={ this.state.value }
        onChange={ !this.state.clearNote && this.handleInputChange }
        maxLength='42'
        placeholder='Untitled'
      />
    </div>
  );
}
