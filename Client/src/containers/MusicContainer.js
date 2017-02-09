var React = require('react');
var Music = require('../components/Music');
var Synth = require('../../Module/Synth');
var keyboard = new Synth();


var MusicContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  onLoad: function () {
    keyboard.setContext(new AudioContext());
  },
  playMusic: function () {
    console.log(keyboard.showContext());
    keyboard.setContext(new AudioContext());
    console.log(keyboard.showContext());
    keyboard.play();
  },
  render: function () {
    return (
      <Music
        onPlayMusic={this.playMusic}/>
    )
  }
})

module.exports = MusicContainer;
