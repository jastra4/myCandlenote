import React from 'react';
import YouTubeList from './youtubeList';


export default class IntelliSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => (
    <YouTubeList />
  );
}
