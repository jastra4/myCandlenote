import React from 'react';

export default props => (
  <div className="google-list-entry">
    <a href={props.result.formattedUrl} target="_blank">
      <div className="google-list-entry-title">{props.result.title}</div>
    </a>
    <p className="google-list-entry-description">{props.result.snippet}</p>
  </div>
);
