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
  playMusic: function () {
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
