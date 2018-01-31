import React from 'react';
import axios from 'axios';
import YouTubeList from './youtubeList';
import SearchResults from './SearchResults';
import WikiSearchResults from './WikiSearchResults';
// import axios from 'axios';


export default class IntelliSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      videos: [],
      wikiResults: [],
    };
  }

  componentWillReceiveProps(newProps) {
    console.log('Props before:', this.props, newProps);
    const searchTerms = newProps.meaning.trim().split(' ').join('+');
    // this.grabGoogleSearch(searchTerms);
    // this.grabYoutubeSearch(searchTerms);
    this.grabWikiSearch(searchTerms);
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

  grabWikiSearch(searchTerms) {
    console.log('Search Terms:', searchTerms);
    axios.post('/api/suggestedWiki', { searchTerms: 'cats' })
      .then((res) => {
        console.log('Response data:', res.data);
        const titles = res.data[1];
        const descriptions = res.data[2];
        const urls = res.data[3];

        const wikiResults = titles.map((title, index) => ({
          title,
          description: descriptions[index],
          url: urls[index],
        }));

        this.setState({ wikiResults });
      })
      .catch(err => console.log('ERR:', err));
  }

  mountVideos = (videos) => {
    this.setState({ videos });
  }

  render = () => (
    <div>
      <p>Hello</p>
      {console.log('Videos:', this.state.wikiResults)}
      {/* <YouTubeList videos={this.state.videos} /> */}
      {/* <SearchResults results={this.state.searchResults} /> */}
      <WikiSearchResults results={this.state.wikiResults}/>
    </div>
  );
}
