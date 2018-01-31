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
    console.log('Props before:', this.props, newProps);
    const searchTerms = newProps.meaning.trim().split('').join('+');
    console.log('Search Terms:', searchTerms);
    axios.post('/api/suggestedResources', { searchTerms })
      .then(res => console.log('Response data:', res.data))
      .catch(err => console.log('ERR:', err));
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
