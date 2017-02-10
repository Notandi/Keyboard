var React = require('react');
var Music = require('../components/Music');
var Synth = require('../../Module/Keyboard');
var keyboard = new Synth();


var MusicContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount: function () {
    //keyboard.setContext(new AudioContext());
  },
  playNote: function (key) {
    keyboard.play();
    console.log(key.keyCode);
  },
  releaseNote: function (key) {
    keyboard.stop();
    console.log(key.keyCode);
  },
  render: function () {
    return (
      <Music
        onPlayNote={this.playNote}
        onReleaseNote={this.releaseNote}/>
    )
  }
})

module.exports = MusicContainer;
