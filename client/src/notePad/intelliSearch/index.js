import React from 'react';
import axios from 'axios';
import YouTubeList from './youtubeList';
import SearchResults from './SearchResults';
// import axios from 'axios';


export default class IntelliSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      videos: [],
    };
  }

  componentWillReceiveProps(newProps) {
    console.log('Props before:', this.props, newProps);
    const searchTerms = newProps.meaning.trim().split(' ').join('+');
    // this.grabGoogleSearch(searchTerms);
    this.grabYoutubeSearch('cats');
  }

  grabGoogleSearch(searchTerms) {
    console.log('Search Terms:', searchTerms);
    axios.post('/api/suggestedResources', { searchTerms })
      .then((res) => {
        console.log('Response data:', res.data);
        this.setState({ searchResults: res.data.items });
      })
      .catch(err => console.log('ERR:', err));
  }

  grabYoutubeSearch(searchTerms) {
    console.log('Search Terms:', searchTerms);
    axios.post('/api/suggestedVideos', { searchTerms })
      .then((res) => {
        console.log('Response data:', res.data);
        this.setState({ videos: res.data.items });
      })
      .catch(err => console.log('ERR:', err));
  }

  mountVideos = (videos) => {
    this.setState({ videos });
  }

  render = () => (
    <div>
      <p>Hello</p>
      {console.log('Videos:', this.state.videos)}
      <YouTubeList videos={this.state.videos} />
      {/* <SearchResults results={this.state.searchResults} /> */}
    </div>
  );
}
