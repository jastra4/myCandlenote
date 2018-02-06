import React from 'react';
import './NoteTitle.css';

export default class NoteTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({ value });
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
