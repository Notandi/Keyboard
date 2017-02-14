var NanoTimer = require('nanotimer');
var Tone = require('tone');


function Keyboard () {
  this.synth = new Tone.PolySynth(8, Tone.Synth).toMaster();
  this.synth.volume.value=10;

}

Keyboard.prototype.activekeys = [];
Keyboard.prototype.keyMap = {
  83: 'C4',
  69: 'C#4',
  68: 'D4',
  82: 'D#4',
  70: 'E4',
  71: 'F4',
  89: 'F#4',
  72: 'G4',
  85: 'G#4',
  74: 'A4',
  73: 'A#4',
  75: 'B4'
};
Keyboard.prototype.notes = {
  83: true,
  69: true,
  68: true,
  82: true,
  70: true,
  71: true,
  89: true,
  72: true,
  85: true,
  74: true,
  73: true,
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
Keyboard.prototype.octave = 3;

Keyboard.prototype.waveForms = ["triangle","square","sine","sawtooth"];
Keyboard.prototype.waveIndex = 0;

Keyboard.prototype.changeWaveRight = function () {
  this.waveIndex++;
  if (this.waveIndex > this.waveForms.length-1) this.waveIndex=0;
  for (var i = 0; i < 8 ; i++){
    this.synth.voices[i].oscillator.type=this.waveForms[this.waveIndex];
  }
}
Keyboard.prototype.changeWaveLeft = function () {
  this.waveIndex--;
  if (this.waveIndex < 0) this.waveIndex=3;
  for (var i = 0; i < 8 ; i++){
    this.synth.voices[i].oscillator.type=this.waveForms[this.waveIndex];
  }
}



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

Keyboard.prototype.upAnOctave = function () {
  if (this.octave < (this.octaves.length-1)){
    this.synth.triggerRelease(this.noteArray());
    this.octave++;
    this.keyMap = this.octaves[this.octave];
  }
}

Keyboard.prototype.downAnOctave = function () {
  if (this.octave > 0){
    this.synth.triggerRelease(this.noteArray());
    this.octave--;
    this.keyMap = this.octaves[this.octave];

  }
}

Keyboard.prototype.noteArray = function () {
  var noteArray = []
  for (name in this.keyMap){
    noteArray.push(this.keyMap[name]);
  }
  return noteArray;
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
Keyboard.prototype.octaves = [{
  83: 'C1',
  69: 'C#1',
  68: 'D1',
  82: 'D#1',
  70: 'E1',
  71: 'F1',
  89: 'F#1',
  72: 'G1',
  85: 'G#1',
  74: 'A1',
  73: 'A#1',
  75: 'B1'
},
{
  83: 'C2',
  69: 'C#2',
  68: 'D2',
  82: 'D#2',
  70: 'E2',
  71: 'F2',
  89: 'F#2',
  72: 'G2',
  85: 'G#2',
  74: 'A2',
  73: 'A#2',
  75: 'B2'
},
{
  83: 'C3',
  69: 'C#3',
  68: 'D3',
  82: 'D#3',
  70: 'E3',
  71: 'F3',
  89: 'F#3',
  72: 'G3',
  85: 'G#3',
  74: 'A3',
  73: 'A#3',
  75: 'B3'
},
{
  83: 'C4',
  69: 'C#4',
  68: 'D4',
  82: 'D#4',
  70: 'E4',
  71: 'F4',
  89: 'F#4',
  72: 'G4',
  85: 'G#4',
  74: 'A4',
  73: 'A#4',
  75: 'B4'
},
{
  83: 'C5',
  69: 'C#5',
  68: 'D5',
  82: 'D#5',
  70: 'E5',
  71: 'F4',
  89: 'F#5',
  72: 'G5',
  85: 'G#5',
  74: 'A5',
  73: 'A#5',
  75: 'B5'
},
{
  83: 'C6',
  69: 'C#6',
  68: 'D6',
  82: 'D#6',
  70: 'E6',
  71: 'F6',
  89: 'F#6',
  72: 'G6',
  85: 'G#6',
  74: 'A6',
  73: 'A#6',
  75: 'B6'
},
{
  83: 'C7',
  69: 'C#7',
  68: 'D7',
  82: 'D#7',
  70: 'E7',
  71: 'F7',
  89: 'F#7',
  72: 'G7',
  85: 'G#7',
  74: 'A7',
  73: 'A#7',
  75: 'B7'
},
{
  83: 'C8',
  69: 'C#8',
  68: 'D8',
  82: 'D#8',
  70: 'E8',
  71: 'F8',
  89: 'F#8',
  72: 'G8',
  85: 'G#8',
  74: 'A8',
  73: 'A#8',
  75: 'B8'
}];


module.exports = Keyboard;
