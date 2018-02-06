import React from 'react';
import _ from 'lodash';
import './NoteTitle.css';

export default class NoteTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    
    this.handleTitleChange = _.debounce(this.handleTitleChange, 2000);
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({ value });

    this.handleTitleChange(value);
  }

  handleTitleChange = (value) => {
    this.props.handleTitleChange(value);
  }

  render = () => (
    <div >
      <input
        className='titleInput'
        value={ this.state.value }
        onChange={ this.handleInputChange }
        maxlength='42'
        placeholder='Untitled'
      />
    </div>
  );
}
