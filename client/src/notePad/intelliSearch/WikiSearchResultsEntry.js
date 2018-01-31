import React from 'react';

export default props => (
  <div className="wiki-list-entry">
    <a href={props.result.url} target="_blank">
      <div className="wiki-list-entry-title">{props.result.title}</div>
    </a>
    <p className="wiki-list-entry-description">{props.result.description}</p>
  </div>
);
