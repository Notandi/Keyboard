import React from 'react';
var PropTypes = React.PropTypes;
import EventListener from 'react-event-listener';
import Slider, { Range } from 'rc-slider';

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
  	    			<div className="volume">
              <Slider vertical min={0} max={10} included={false} defaultValue={10} onChange={props.setVolume}/>
              </div>
  	    		</div>
  	    		<div className="keys">
  	    			<div className={'key '+ props.keyboardState.key1}></div>
  	    			<div className={'black-key '+ props.keyboardState.key2}></div>
  	    			<div className={'key '+ props.keyboardState.key3}></div>
              <div className={'black-key '+ props.keyboardState.key4}></div>
  	    			<div className={'key '+ props.keyboardState.key5}></div>
  	    			<div className={'key '+ props.keyboardState.key6}></div>
              <div className={'black-key '+ props.keyboardState.key7}></div>
  	    			<div className={'key '+ props.keyboardState.key8}></div>
              <div className={'black-key '+ props.keyboardState.key9}></div>
  	    			<div className={'key '+ props.keyboardState.key10}></div>
              <div className={'black-key '+ props.keyboardState.key11}></div>
  	    			<div className={'key '+ props.keyboardState.key12}></div>
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
  setVolume: PropTypes.func.isRequired,
}

module.exports = Music;
