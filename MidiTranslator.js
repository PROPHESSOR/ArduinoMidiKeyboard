const MIDI = require('./Midi');

const DRUMS = [
    0,
    35, //Kick
    38, //Snare
    42, //Closed Hat
    32  //Clap
];

module.exports = {
    drum(n){
        MIDI.on(DRUMS[n]||n, 127, 9);
    },
    drumstop(n){
        MIDI.off(DRUMS[n]||n, 127, 9);
    }
};