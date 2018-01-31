import React from 'react';
import YouTube from 'react-youtube';

const opts = {
  height: '160',
  width: '300',
  playerVars: { autoplay: 0 },
};

export default props => (
  <div className="video-list-entry media" onClick={props.handleCurrentVideoChange}>
    {console.log(props.video)}
    <div className="media-left media-middle">
    {/* https://www.youtube.com/watch?v=zU7co2-yn_Q */}
      <a href={`https://www.youtube.com/watch?v=${props.video.id.videoId}`} target="_blank">
        <img className="media-object" src={props.video.snippet.thumbnails.default.url} alt="video entry" />
      </a>
    </div>
    <div className="media-body">
      <a href={`https://www.youtube.com/watch?v=${props.video.id.videoId}`} target="_blank">
        <div className="video-list-entry-title">{props.video.snippet.title}</div>
      </a>
      <div className="video-list-entry-detail">{props.video.snippet.description}</div>
    </div>
  </div>
);
