import React from 'react';
var PropTypes = React.PropTypes;
import EventListener from 'react-event-listener';

function Music (props) {
  return (
    <div>
      <EventListener
          target="window"
          onKeyDown={(e) => props.onPlayNote(e)}
          onKeyUp={(e) => props.onReleaseNote(e)}
        />
        <div className="pianoplacer">
  	    	<div className="piano">
  	    		<div className="effects">
  	    			<div className="phaser">
              

              </div>
  	    		</div>
  	    		<div className="keys">
  	    			<div className="key"></div>
  	    			<div className="black-key"></div>
  	    			<div className="key"></div>
  	    			<div className="black-key"></div>
  	    			<div className="key"></div>
  	    			<div className="key"></div>
  	    			<div className="black-key"></div>
  	    			<div className="key"></div>
  	    			<div className="black-key"></div>
  	    			<div className="key"></div>
  	    			<div className="black-key"></div>
  	    			<div className="key"></div>
  	    		</div>
  	    	</div>
      	</div>
    </div>
  )
}

Music.propTypes = {
  onPlayNote: PropTypes.func.isRequired,
  onReleaseNote: PropTypes.func.isRequired,
  onPhaser: PropTypes.func.isRequired,
  keyboardState: PropTypes.object.isRequired,
}

module.exports = Music;
