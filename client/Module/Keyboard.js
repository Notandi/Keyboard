var NanoTimer = require('nanotimer');
var Tone = require('tone');


function Keyboard () {
  this.synth = new Tone.PolySynth(8, Tone.Synth).toMaster();
  this.synth.volume.value=10;

}

Keyboard.prototype.activekeys = [];
Keyboard.prototype.keyMap = {
  65: 'C3',
  87: 'C#3',
  83: 'D3',
  69: 'D#3',
  68: 'E3',
  70: 'F3',
  84: 'F#3',
  71: 'G3',
  89: 'G#3',
  72: 'A3',
  85: 'A#3',
  74: 'B3',
  75: 'C4'
};
Keyboard.prototype.notes = {
  65: true,
  87: true,
  83: true,
  69: true,
  68: true,
  70: true,
  84: true,
  71: true,
  89: true,
  72: true,
  85: true,
  74: true,
  75: true
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


Keyboard.prototype.setVolume = function (value){
  this.synth.volume.value = value
}

// laga þetta fall
Keyboard.prototype.findNote = function (key){
  for (name in this.keyMap){
    if (key === Number(name)) {
      return this.keyMap[name];
    }
  }
  return false;
}

//laga þetta líka gera betur
Keyboard.prototype.wantToPlay = function (note){
  for (name in this.notes){
    if (String(note) === String(name)) {
      if (this.notes[name]){
        this.notes[name] = false
        return true;
      }
      return false;
    }
  }
  return false;
}

Keyboard.prototype.wantToStop = function (note){
  for (name in this.notes){
    if (String(note) === String(name)) {
      if (!this.notes[name]){
        this.notes[name] = true;
        return false;
      }
      return true;
    }
  }
  return true;
}

Keyboard.prototype.play = function (key) {
  var note = this.findNote(key);
  var canPlay = this.wantToPlay(key);
  if (note && canPlay) {
    this.synth.triggerAttack(note,undefined,0.2)
  }
}

Keyboard.prototype.arpegiate = function () {
}

Keyboard.prototype.stop = function (key) {
  var note = this.findNote(key);
  var canPlay = this.wantToStop(key);
  if (note && !canPlay) {
    this.synth.triggerRelease(note, undefined);
  }
}

Keyboard.prototype.addAutoWah = function () {
  this.autoWah = new Tone.AutoWah(50, 6, -30).toMaster();
  //initialize the synth and connect to autowah
  this.synth.connect(this.autoWah);
  //Q value influences the effect of the wah - default is 2
  this.autoWah.Q.value = 6;
}

Keyboard.prototype.addBitCrusher = function (value) {
  if(this.bitCrusher){
    this.bitCrusher.bits = value;
  }else {
    this.bitCrusher = new Tone.BitCrusher(value).toMaster();
    this.synth.connect(this.bitCrusher);
  }
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

Keyboard.prototype.addDistortion = function (value) {
  if (this.distortion){
    this.distortion.distortion = value;
  } else {
    this.distortion = new Tone.Distortion(value).toMaster();
    this.distortion.oversample = "4x";
    this.synth.connect(this.distortion);
  }
}

Keyboard.prototype.addFeedbackDelay = function (value) {
  if (this.feedbackDelay){
    this.feedbackDelay.delayTime = value;
  }else{
    this.feedbackDelay = new Tone.FeedbackDelay(value, 0.5).toMaster();
    this.synth.connect(this.feedbackDelay);
  }
}

Keyboard.prototype.addFreeverb = function () {
  this.freeverb = new Tone.Freeverb().toMaster();
  this.freeverb.dampening.value = 1000;
  //routing synth through the reverb
  this.synth.connect(this.freeverb);
}

Keyboard.prototype.addPhaser = function () {
  if(this.phaser){
    this.phaser.dispose();
    this.phaser = new Tone.Phaser({
    	"frequency" : 200,
    	"octaves" : 8,
    	"baseFrequency" : 2000
    }).toMaster();
    this.synth.connect(this.phaser);
    console.log(this.phaser);
  }else{
    this.phaser = new Tone.Phaser({
  	"frequency" : 15,
  	"octaves" : 5,
  	"baseFrequency" : 1000
    }).toMaster();
    this.synth.connect(this.phaser);
  }
}

Keyboard.prototype.addPingPongDelay = function () {
  this.pingPongDelay = new Tone.PingPongDelay("4n", 0.2).toMaster();
  this.synth.connect(this.pingPongDelay);
}


module.exports = Keyboard;
