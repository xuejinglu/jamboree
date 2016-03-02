import React from 'react';

var VideoPlayer = ( props ) => (
  <div className="videoPlayer">
    <div className="embed-responsive">
      <iframe className="embed-responsive-item" 
      src={`https://www.youtube.com/embed/${props.video.id.videoId}?autoplay=1`} 
      allowFullScreen></iframe>

      <div className="video-player-details">
        <h3>{props.video.snippet.title}</h3>
        <div>{props.video.snippet.description}</div>
      </div>
    </div>
  </div>
);

export default VideoPlayer;
