var NanoTimer = require('nanotimer');
var Tone = require('tone');


function Keyboard () {
  this.synth = new Tone.PolySynth(6, Tone.Synth).toMaster();

}

Keyboard.prototype.activekeys = [];
Keyboard.prototype.keyMap = {
  65: 'C3',
  83: 'G3'
};

Keyboard.prototype.autoWah;
Keyboard.prototype.bitCrusher;
Keyboard.prototype.chebyShev;
Keyboard.prototype.chorus;
Keyboard.prototype.distortion;
Keyboard.prototype.feedbackDelay;
Keyboard.prototype.freeverb;
Keyboard.prototype.phaser;
Keyboard.prototype.pingPongDelay;

Keyboard.prototype.findNote = function (key){
  //finna nótu laga seinna
  return 'C3';
}

Keyboard.prototype.play = function () {
  // var note = findNote(key);
  console.log(this.synth);
  this.synth.triggerAttack('C3',undefined,0.2)
  // Keyboard.synth.triggerAttack(["Ab3", "C4", "F5"], undefined, 0.2);
  // Keyboard.synth.triggerRelease(["Ab3", "C4"], "+2n");
}

Keyboard.prototype.arpegiate = function () {
}

Keyboard.prototype.stop = function (key) {
  //var note = findNote(key);
  this.synth.triggerAttack('C3',"+2n");
  // Keyboard.synth.triggerRelease(["Ab3", "C4"], "+2n");
}

Keyboard.prototype.addAutoWah = function () {
  this.autoWah = new Tone.AutoWah(50, 6, -30).toMaster();
  //initialize the synth and connect to autowah
  this.synth.connect(this.autoWah);
  //Q value influences the effect of the wah - default is 2
  this.autoWah.Q.value = 6;
}

Keyboard.prototype.addBitCrusher = function () {
  this.bitCrusher = new Tone.BitCrusher(4).toMaster();
  this.synth.connect(this.bitCrusher);
}

Keyboard.prototype.addChebyshev = function () {
  //create a new cheby
  this.Chebyshev = new Tone.Chebyshev(50);
  //create a monosynth connected to our cheby
  this.synth.connect(this.chebyShev);
}

Keyboard.prototype.addChorus = function () {
  this.chorus = new Tone.Chorus(4, 2.5, 0.5);
  this.synth.connect(this.chorus);
}

Keyboard.prototype.addDistortion = function () {
  this.distortion = new Tone.Distortion(0.8).toMaster();
  this.synth.connect(this.distortion);
}

Keyboard.prototype.addFeedbackDelay = function () {
  this.feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toMaster();
  this.synth.connect(this.feedbackDelay);
}

Keyboard.prototype.addFreeverb = function () {
  this.freeverb = new Tone.Freeverb().toMaster();
  this.freeverb.dampening.value = 1000;
  //routing synth through the reverb
  this.synth.connect(this.freeverb);
}

Keyboard.prototype.addPhaser = function () {
  this.phaser = new Tone.Phaser({
	"frequency" : 15,
	"octaves" : 5,
	"baseFrequency" : 1000
  }).toMaster();
  this.synth.connect(this.phaser);
}

Keyboard.prototype.addPingPongDelay = function () {
  this.pingPongDelay = new Tone.PingPongDelay("4n", 0.2).toMaster();
  this.synth.connect(this.pingPongDelay);
}


module.exports = Keyboard;





// Keyboard.prototype.addConvolver = function () {
//
// }
// Keyboard.prototype.addFeedbackEffect = function () {
//
// }
// Keyboard.prototype.jcReverb;
// Keyboard.prototype.addJCReverb = function () {
//   var reverb = new Tone.JCReverb(0.4).connect(Tone.Master);
//   var delay = new Tone.FeedbackDelay(0.5);
//   //connecting the synth to reverb through delay
//   var synth = new Tone.DuoKeyboard().chain(delay, reverb);
//   synth.triggerAttackRelease("A4","8n");
// }

// Keyboard.prototype.addMidSideEffect = function () {
//
// }
// Keyboard.prototype.addAutoFilter = function () {
//
// }
//
// Keyboard.prototype.addAutoPanner = function () {
//
// }
// Keyboard.prototype.addPitchShift = function () {
//
// }
//
// Keyboard.prototype.addStereoEffect = function () {
//
// }
//
// Keyboard.prototype.addStereoFeedbackEffect = function () {
//
// }
//
// Keyboard.prototype.addStereoWidener = function () {
//
// }
//
// Keyboard.prototype.addStereoXFeedbackEffect = function () {
//
// }
//
// Keyboard.prototype.addTremolo = function () {
//
// }
//
// Keyboard.prototype.addVibrato = function () {
//
// }