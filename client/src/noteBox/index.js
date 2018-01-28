import React from 'react';
import Note from './note';

const titles = [
  'My First Note',
  'My Second Note',
  'My Third Note',
];

export default () => (
  <div>
    { titles.map((title, i) => <Note title={ title } key={ i }/>) }
  </div>
);
