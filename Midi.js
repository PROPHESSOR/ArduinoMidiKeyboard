const MIDI = require('easymidi');

const out = new MIDI.Output(MIDI.getOutputs()[0]);

module.exports = {
    on(note = 64, velocity = 127, channel = 3) {
        console.log(`MIDI-on: ${note}*${velocity}:${channel}`);
        out.send('noteon', {
            note,velocity,channel
        });
    },
    off(note = 64, velocity = 127, channel = 3){
        console.log(`MIDI-off: ${note}*${velocity}:${channel}`);
        out.send('noteoff', {
            note,velocity,channel
        });
    },
    close(){
        out.close();
    }
}