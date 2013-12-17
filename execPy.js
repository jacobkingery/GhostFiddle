var exec = require('child_process').exec;
var cmdQueue = new Array();

this.playSong = function (song) {
	cmdQueue.push({'song':song,
				'state':'pending'});
	processQueue();
}
var callback=function(error,stdout,stderr){
	if(stdout){console.log('Out: ' + stdout);}
    if(strerr){console.log('Err: ' + stderr);}
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    cmdQueue.shift();
    processQueue();
}
function processQueue(){
	if(cmdQueue.length > 0 && cmdQueue[0].state == 'pending'){
		var song = cmdQueue[0].song;
		cmdQueue[0].state='playing';
		console.log("exec:")
		exec('python subProcessedDriver.py "'+song+'"',callback);
	}
}
