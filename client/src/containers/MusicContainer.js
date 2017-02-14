import React from 'react';
import Music from '../components/Music';
import Synth from '../../Module/Keyboard';
var keyboard = new Synth();

var keyMap = {
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

var waves = ["triangle","square","sine","sawtooth"];
class MusicContainer extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);
    this.playNote = this.playNote.bind(this);
    this.releaseNote = this.releaseNote.bind(this);
    this.rightWave = this.rightWave.bind(this);
    this.leftWave = this.leftWave.bind(this);
    this.state = {
      octave: 4,
      waveForm: "triangle",
      waveIndex: 0,
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
    }
  }
  rightWave() {
    this.state.waveIndex++;
    if (this.state.waveIndex > waves.length-1) this.state.waveIndex=0;
    var wave = waves[this.state.waveIndex];
    this.setState({waveForm : wave});
    keyboard.changeWaveRight();
  }
  leftWave() {
    this.state.waveIndex--;
    if (this.state.waveIndex < 0) this.state.waveIndex=3;
    var wave = waves[this.state.waveIndex];
    this.setState({waveForm : wave});
    keyboard.changeWaveLeft();
  }
  playNote (input) {
    var keystroke = input.keyCode;
    var oct = this.state.octave;
    if (keystroke === 81 && this.state.octave > 1) {
      keyboard.downAnOctave();
      oct--;
      this.setState({octave : oct});
    }
    else if (keystroke === 73 && this.state.octave < 8) {
      keyboard.upAnOctave();
      oct++;
      this.setState({octave : oct});
    }
    else if (keystroke === 37) {
      this.leftWave();
    }
    else if (keystroke === 39) {
      this.rightWave();
    }
    else {
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

  render () {
    return (
      <Music
        onPlayNote={this.playNote}
        onReleaseNote={this.releaseNote}
        keyboardState={this.state}
        setWaveFormRight={this.rightWave}
        setWaveFormLeft={this.leftWave}/>
    )
  }
};

module.exports = MusicContainer;
