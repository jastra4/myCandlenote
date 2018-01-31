import React from 'react';
import YouTube from 'react-youtube';

const opts = {
  height: '130',
  width: '250',
  playerVars: { autoplay: 0 },
};

export default props => (
  <div className="video-list-entry media" onClick={props.handleCurrentVideoChange}>
    <div className="media-left media-middle">
      <img className="media-object" src={props.video.snippet.thumbnails.default.url} alt="video entry" />
    </div>
    <div className="media-body">
      <div className="video-list-entry-title">{props.video.snippet.title}</div>
      <div className="video-list-entry-detail">{props.video.snippet.description}</div>
    </div>

    <YouTube
      videoId={props.video.id.videoId}
      // id={string}
      className={''}
      opts={opts}
      // onPlay={func}
      // onReady={func}
      // onPause={func}
      // onEnd={func}
      // onError={func}
      // onStateChange={func}
      // onPlaybackRateChange={func}
      // onPlaybackQualityChange={func}
    />

  </div>
);
