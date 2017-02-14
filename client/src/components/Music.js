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
        <div className="textplacer">
          <h1>Keyboard</h1>
          <p>use the keys "s d f g h j k" to play the white keys and  "e r y u i" to play the black keys</p>
          <p>use the key "a" to go down an octave and "l" to go up an octave</p>
        </div>
        <a href="https://github.com/Notandi/Keyboard"><img className="github" src="github.svg" /></a>
        <div className="pianoplacer">
  	    	<div className="piano">
  	    		<div className="effects">
              <p className="octave"> oct </p>
              <p className="octaveNumber">{props.keyboardState.octave}</p>
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
        <div className="waveplacer">
          <div className="arrowLeft" onClick={props.setWaveFormLeft}></div>
          <p className="waves">{props.keyboardState.waveForm}</p>
          <div className="arrowRight" onClick={props.setWaveFormRight}></div>
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
  setBitcrush: PropTypes.func.isRequired,
  setDistortion: PropTypes.func.isRequired,
  setDelay: PropTypes.func.isRequired,
  setWaveFormRight: PropTypes.func.isRequired,
  setWaveFormLeft: PropTypes.func.isRequired,
}

module.exports = Music;
