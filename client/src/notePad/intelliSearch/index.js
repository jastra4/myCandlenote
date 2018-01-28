import React from 'react';
import YouTubeList from './youtubeList';
import axios from 'axios';


export default class IntelliSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    axios.get('')
  }

  render = () => (
    <YouTubeList />
  );
}
