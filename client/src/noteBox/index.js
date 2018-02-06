import React, { Component } from 'react';
import Note from './note';

const titles = [
  'My First Note',
  'My Second Note',
  'My Third Note',
];

export default class Notebox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    console.log('mounted notebox');
    const currentUser = this.props.currentUser.userId;
    console.log('currentUSERRRRR: ', currentUser);
    this.props.getNotes(currentUser);
  }

  render = () => (
    <div>
      { titles.map((title, i) => <Note title={ title } key={ i }/>) }
    </div>
  )
}
