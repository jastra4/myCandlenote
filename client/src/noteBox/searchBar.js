import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';


export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  handleSearch = (e, { value }) => {
    this.props.filterNotes(value.toLowerCase());
  };

  render = () => (
    <Input
      action='Search'
      placeholder='Search...'
      className='notePreviewSearch'
      onChange={ this.handleSearch }
    />
  )
}

