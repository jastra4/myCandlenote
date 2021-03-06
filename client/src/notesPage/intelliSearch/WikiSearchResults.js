import React from 'react';
import WikiSearchResultsEntry from './WikiSearchResultsEntry';

export default props => (
  <div className="results-list">
    {
      props.results.map(result => (
        <WikiSearchResultsEntry
          key={result.title}
          result={result}
        />
      ))
    }
  </div>
);
