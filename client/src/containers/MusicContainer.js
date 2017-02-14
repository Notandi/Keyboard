import React from 'react';
import Music from '../components/Music';
import Synth from '../../Module/Keyboard';
var keyboard = new Synth();

var map = {
  65: "key1",
  87: "key2",
  83: "key3",
  69: "key4",
  68: "key5",
  70: "key6",
  84: "key7",
  71: "key8",
  89: "key9",
  72: "key10",
  85: "key11",
  74: "key12"
}

class MusicContainer extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);
    this.playNote = this.playNote.bind(this);
    this.releaseNote = this.releaseNote.bind(this);
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

  delay(value){
    var val = value/10;
    keyboard.addFeedbackDelay(val);
  }

  bitCrush(value){
    keyboard.addBitCrusher(value);
  }
  distortion(value){
    var val = value/10;
    keyboard.addDistortion(val);
  }

  playNote (input) {
    var keystroke = input.keyCode;
    keyboard.play(keystroke);
    for (var k in map) {
      if (Number(k) === Number(keystroke)) {
          var key = map[k];
          var obj = {};
          obj[key] = 'active';
          this.setState(obj);
        }
    }
  }

  releaseNote (input) {
    var keystroke = input.keyCode;
    keyboard.stop(keystroke);
    for (var k in map) {
      if (Number(k) === Number(keystroke)) {
          var key = map[k];
          var obj = {};
          obj[key] = '';
          this.setState(obj);
        }
    }
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
        setVolume={this.volume}
        setBitcrush={this.bitCrush}
        setDistortion={this.distortion}
        setDelay={this.delay}/>
    )
  }
};

module.exports = MusicContainer;
