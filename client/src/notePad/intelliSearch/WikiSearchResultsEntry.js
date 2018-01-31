import React from 'react';

export default props => (
  <li>
    <a href={props.result.formattedUrl} target="_blank">{props.result.htmlTitle}</a>
    <p>{props.result.htmlSnippet}</p>
  </li>
);
