import React from 'react';

export default props => (
  <li>
    <a href={props.result.url} target="_blank">{props.result.title}</a>
    <p>{props.result.description}</p>
  </li>
);
