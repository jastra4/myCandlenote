import React from 'react';
import SearchResultsEntry from './SearchResultEntry';

export default props => (
  <div className="results-list">
    {
      props.results.map(result => (
        <SearchResultsEntry
          result={result}
        />
      ))
    }
  </div>
);
