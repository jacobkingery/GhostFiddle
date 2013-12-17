var exec    =   require('child_process').exec;
var cmdQueue = new Array();

this.playSong = function (song) {
	cmdQueue.push({'song':song});
	processQueue();
}
var callback=function(error,stdout,stderr){
	console.log('Out: ' + stdout);
    console.log('Err: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    processQueue();
}
function processQueue(){
	if(cmdQueue.length > 0){
		var song = cmdQueue.shift().song;
		console.log("exec:")
		exec('python subProcessedDriver.py '+song,[{timeout:100}],callback);

	}
}