import React from 'react';

var VideoPlayer = ( props ) => (
  <div className="videoPlayer">
    <div className="embedResponsive">
      <iframe className="embedResponsiveItem" 
      src={`https://www.youtube.com/embed/${props.video.id.videoId}?autoplay=1`} 
      allowFullScreen></iframe>
    </div>
    <div className="videoPlayerDetails">
      <h3>{props.video.snippet.title}</h3>
    </div>
  </div>
);

export default VideoPlayer;
