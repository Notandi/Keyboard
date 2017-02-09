const NanoTimer = require('nanotimer');

function Synth () {
}

Synth.prototype.context;
Synth.prototype.vco;
Synth.prototype.vca;

Synth.prototype.setContext = function (ctx) {
  this.context = ctx;

  this.vco = this.context.createOscillator();
  this.vco.type = this.vco.SINE;
  this.vco.frequency.value = 440;
  this.vco.start(0);

  this.vca = this.context.createGain();
  this.vca.gain.value = 0;

  this.vco.connect(this.vca);
  this.vca.connect(this.context.destination);
}

Synth.prototype.play = function () {
  this.vco.frequency.value = 440;
  this.vca.gain.value = 1;
}

Synth.prototype.arpegiate = function () {
  this.vco.frequency.value = 440;
  this.vca.gain.value = 0;
}

Synth.prototype.stop = function () {

}

Synth.prototype.showContext = function () {
  return this.context;
}



module.exports = Synth;
