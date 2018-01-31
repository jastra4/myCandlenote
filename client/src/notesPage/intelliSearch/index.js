import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import YouTubeList from './youtubeList';
import SearchResults from './SearchResults';
import WikiSearchResults from './WikiSearchResults';
import './intelliSearch.css';
// import axios from 'axios';


export default class IntelliSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      videos: [],
      wikiResults: [],
      fromGoogle: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const searchTerms = newProps.meaning.trim().split(' ').join('+');
    this.grabGoogleSearch(searchTerms);
    this.grabYoutubeSearch(searchTerms);
    this.grabWikiSearch(searchTerms);
  }

  grabGoogleSearch(searchTerms) {
    axios.post('/api/suggestedResources', { searchTerms })
      .then(res => this.setState({ searchResults: res.data.items }))
      .catch(err => console.log('ERR:', err));
  }

  grabYoutubeSearch(searchTerms) {
    axios.post('/api/suggestedVideos', { searchTerms })
      .then(res => this.setState({ videos: res.data.items }))
      .catch(err => console.log('ERR:', err));
  }

  grabWikiSearch(searchTerms) {
    axios.post('/api/suggestedWiki', { searchTerms })
      .then((res) => {
        if (res.data.isFromGoogle) {
          this.setState({
            wikiResults: res.data.items,
            fromGoogle: true,
          });
        } else {
          const titles = res.data[1];
          const descriptions = res.data[2];
          const urls = res.data[3];

          const wikiResults = titles.map((title, index) => ({
            title,
            description: descriptions[index],
            url: urls[index],
          }));

          this.setState({ wikiResults });
        }
      })
      .catch(err => console.log('ERR:', err));
  }

  mountVideos = (videos) => {
    this.setState({ videos });
  }

  render = () => (
    <div>
      <Tabs>
        <TabList>
          <Tab>Google</Tab>
          <Tab>Youtube</Tab>
          <Tab>Wikipedia</Tab>
        </TabList>
        <TabPanel>
          <SearchResults results={this.state.searchResults} />
        </TabPanel>
        <TabPanel>
          <YouTubeList videos={this.state.videos} />
        </TabPanel>
        <TabPanel>
          {this.state.fromGoogle ? <SearchResults results={this.state.wikiResults} /> :
          <WikiSearchResults results={this.state.wikiResults}/>}
        </TabPanel>
      </Tabs>
    </div>
  );
}
