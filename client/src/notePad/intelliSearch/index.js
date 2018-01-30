import React from 'react';
import axios from 'axios';
import YouTubeList from './youtubeList';
// import axios from 'axios';


export default class IntelliSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videos: [] };
  }

  componentWillReceiveProps(newProps) {
    console.log('Props before:', this.props);
    const searchTerms = newProps.meaning.trim().split(' ').join('+');
    const params = {
      maxResults: newProps.limit,
      part: 'snippet',
      q: searchTerms,
      type: 'video',
      key: process.env.YOUTUBE_DATA_API_KEY,
      videoEmbeddable: 'true',
    };
    console.log('Params:', params);

    axios({
      method: 'get',
      url: 'https://www.googleapis.com/youtube/v3/search',
      maxResults: newProps.limit,
      part: 'snippet',
      q: searchTerms,
      type: 'video',
      key: process.env.YOUTUBE_DATA_API_KEY,
      videoEmbeddable: 'true',
    })
      .then(res => console.log('Response data:', res.data))
      .catch(err => console.log('Youtube API err:', err));
  }

  mountVideos = (videos) => {
    this.setState({ videos });
  }

  render = () => (
    <div>
      {/* <YouTubeList /> */}
    </div>
  );
}
