import React from 'react';
import Music from '../components/Music';
import Synth from '../../Module/Keyboard';
var keyboard = new Synth();

class MusicContainer extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);

    this.state = {
      key1: "",
      key2: "",
      key3: "",
      key4: "",
      key5: "",
      key6: "",
      key7: "",
      key8: "",
      key9: "",
      key10: "",
      key11: "",
      key12: "",
      slider: 0,
      autoWah: 0,
      bitCrusher: 0,
      chebyShev: 0,
      chorus: 0,
      distortion: 0,
      feedbackDelay: 0,
      freeverb: 0,
      phaser: 0,
      pingPongDelay: 0
    }
  }

  volume(value){
    keyboard.setVolume(value);
  }

  playNote (key) {
    keyboard.play(key.keyCode);
  }

  releaseNote (key) {
    keyboard.stop(key.keyCode);
  }

  phaser (){
    keyboard.addBitCrusher();
    console.log('dist');
  }

  render () {
    return (
      <Music
        onPlayNote={this.playNote}
        onReleaseNote={this.releaseNote}
        onPhaser={this.phaser}
        keyboardState={this.state}
        setVolume={this.volume}/>
    )
  }
};

module.exports = MusicContainer;
