import React from 'react';
import Music from '../components/Music';
import Synth from '../../Module/Keyboard';
var keyboard = new Synth();

var keyMap = {
  83: "key1",
  69: "key2",
  68: "key3",
  82: "key4",
  70: "key5",
  71: "key6",
  89: "key7",
  72: "key8",
  85: "key9",
  74: "key10",
  73: "key11",
  75: "key12"
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
    for (var code in keyMap) {
      if (Number(code) === Number(keystroke)) {
          var key = keyMap[code];
          var obj = {};
          obj[key] = 'active';
          this.setState(obj);
        }
    }
  }

  releaseNote (input) {
    var keystroke = input.keyCode;
    keyboard.stop(keystroke);
    for (var code in keyMap) {
      if (Number(code) === Number(keystroke)) {
          var key = keyMap[code];
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
