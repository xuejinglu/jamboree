import React from 'react';

const VideoPlayer = (props) => (
  <div className="videoPlayer">
    <div className="embed-responsive embed-responsive-16by9">
      <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${props.video.id.videoId}?autoplay=1`} allowFullScreen></iframe>
    </div>

    <div className="video-player-details">
      <h3 className="videoTitle">{ props.video.snippet.title.substr( 0, 64 ) }</h3>
    </div>
  </div>
);

export default VideoPlayer;
