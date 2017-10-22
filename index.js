console.log("Hello!");

const stdio = require("./repl");

console.log("Initializing Arduino...");

const $ = require('johnny-five');
const $$ = new $.Board({
    repl:false
});

console.log("Initializing new MIDI device...");

const tmidi = require('./MidiTranslator');
const MIDI = require('./Midi');
const _MIDI = require('easymidi');

$$.on("ready",function(){
    console.log("I'm ready =)");
    StatusLoop();
    //TODO:
});

stdio.on('line', function(line){
    let tmp;
    try {
        tmp = eval(line);
    } catch (e) {
        tmp = `Error: ${e}`;
    }
    console.log(`-=>>${line}: ${tmp}`);
});


function StatusLoop(){
    const pin13 = new $.Led(13);
    return setInterval(()=>{pin13.toggle()}, 500);
}

function read(pin, cb){
    $$.pinMode(+pin, $.Pin.ANALOG);
    return $$.analogRead(pin,cb||console.log);
}

function watch(pin, cb){
    read(pin,(x)=>{
        let c = cb||console.log;
        c(x>10);
    });
}

function check(){
    watch(1, (x)=>{
        if(x) console.log(1);
    })

    watch(2, (x)=>{
        if(x) console.log(2);
    })

    watch(3, (x)=>{
        if(x) console.log(3);
    })

    watch(4, (x)=>{
        if(x) console.log(4);
    })

    return "Started!";
}

function run(){
    const states = [0,false,false,false,false];

    watch(1, (x)=>{
        if(!!x === states[1]) return;
        states[1] = !!x;
        x?tmidi.drum(1):tmidi.drumstop(1);
    })

    watch(2, (x)=>{
        if(!!x === states[2]) return;
        states[2] = !!x;
        x?tmidi.drum(2):tmidi.drumstop(2);
    })

    watch(3, (x)=>{
        if(!!x === states[3]) return;
        states[3] = !!x;
        x?tmidi.drum(3):tmidi.drumstop(3);
    })

    watch(4, (x)=>{
        if(!!x === states[4]) return;
        states[4] = !!x;
        x?tmidi.drum(4):tmidi.drumstop(4);
    })

    return "Started!";
}

function exit(){
    MIDI.close();
    console.log("EXIT!");
    return process.exit(1);
}