var NanoTimer = require('nanotimer');
var Tone = require('tone');


function Keyboard () {
  Keyboard.synth = new Tone.Synth({
    "oscillator" : {
        "type" : "pwm",
        "modulationFrequency" : 0.2
    },
    "envelope" : {
        "attack" : 0.02,
        "decay" : 0.1,
        "sustain" : 0.2,
        "release" : 0.9,
    }
  }).toMaster();
}
Keyboard.prototype.autoWah;
Keyboard.prototype.bitCrusher;
Keyboard.prototype.chebyShev;
Keyboard.prototype.chorus;
Keyboard.prototype.distortion;
Keyboard.prototype.feedbackDelay;
Keyboard.prototype.freeverb;
Keyboard.prototype.phaser;
Keyboard.prototype.pingPongDelay;

Keyboard.prototype.play = function (key, freq) {
  Keyboard.synth.triggerAttack('C3');

}

Keyboard.prototype.arpegiate = function () {
}

Keyboard.prototype.stop = function (key) {
}

Keyboard.prototype.showContext = function () {
}

Keyboard.prototype.addAutoWah = function () {
  Keyboard.autoWah = new Tone.AutoWah(50, 6, -30).toMaster();
  //initialize the synth and connect to autowah
  Keyboard.synth.connect(Keyboard.autoWah);
  //Q value influences the effect of the wah - default is 2
  Keyboard.autoWah.Q.value = 6;
}

Keyboard.prototype.addBitCrusher = function () {
  Keyboard.bitCrusher = new Tone.BitCrusher(4).toMaster();
  Keyboard.synth.connect(Keyboard.bitCrusher);
}

Keyboard.prototype.addChebyshev = function () {
  //create a new cheby
  Keyboard.Chebyshev = new Tone.Chebyshev(50);
  //create a monosynth connected to our cheby
  Keyboard.synth.connect(Keyboard.chebyShev);
}

Keyboard.prototype.addChorus = function () {
  Keyboard.chorus = new Tone.Chorus(4, 2.5, 0.5);
  Keyboard.synth.connect(Keyboard.chorus);
}

Keyboard.prototype.addDistortion = function () {
  Keyboard.distortion = new Tone.Distortion(0.8).toMaster();
  Keyboard.synth.connect(Keyboard.distortion);
}

Keyboard.prototype.addFeedbackDelay = function () {
  Keyboard.feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toMaster();
  Keyboard.synth.connect(Keyboard.feedbackDelay);
}

Keyboard.prototype.addFreeverb = function () {
  Keyboard.freeverb = new Tone.Freeverb().toMaster();
  Keyboard.freeverb.dampening.value = 1000;
  //routing synth through the reverb
  Keyboard.synth.connect(Keyboard.freeverb);
}

Keyboard.prototype.addPhaser = function () {
  Keyboard.phaser = new Tone.Phaser({
	"frequency" : 15,
	"octaves" : 5,
	"baseFrequency" : 1000
  }).toMaster();
  Keyboard.synth.connect(Keyboard.phaser);
}

Keyboard.prototype.addPingPongDelay = function () {
  Keyboard.pingPongDelay = new Tone.PingPongDelay("4n", 0.2).toMaster();
  Keyboard.synth.connect(Keyboard.pingPongDelay);
}




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



module.exports = Keyboard;
