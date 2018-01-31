import React from 'react';
import axios from 'axios';
import YouTubeList from './youtubeList';
import SearchResultsEntry from './SearchResultEntry';
// import axios from 'axios';


export default class IntelliSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [] };
  }

  componentWillReceiveProps(newProps) {
    console.log('Props before:', this.props, newProps);
    const searchTerms = newProps.meaning.trim().split(' ').join('+');
    console.log('Search Terms:', searchTerms);
    axios.post('/api/suggestedResources', { searchTerms })
      .then((res) => {
        console.log('Response data:', res.data);
        this.setState({ searchResults: res.data.items });
      })
      .catch(err => console.log('ERR:', err));
  }

  mountVideos = (videos) => {
    this.setState({ videos });
  }

  render = () => (
    <div>
      <p>Hello</p>
      {/* <YouTubeList /> */}
      <ul>
        {this.state.searchResults.map(result => (
          <SearchResultsEntry result={result} />
        ))}
      </ul>
    </div>
  );
}
