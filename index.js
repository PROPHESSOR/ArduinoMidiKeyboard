const stdio = require("./repl");
const $ = require('johnny-five');
const $$ = new $.Board({
    repl:false
});

$$.on("ready",function(){
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

    return "Started!";
}

function _check(){

}