var python = require('../python.js').shell;
var callback = function(err, data) {
   if (err) {
     console.error(err);
   } else {
     process.stdout.write(data.toString('utf8') + 'Finished python line\n');
   }
};
python('import testModule', callback);
python('testModule.makeFile()', callback);

exports.line = function(req, res) {
    res.render('raph', {title: 'Raphael Line Test'});
};

exports.success = function(req, res) {
    res.render('success', {title: 'Song Saved!'});
};

exports.failure = function(req, res) {
    res.render('failure', {title: 'Save Unsuccessful!'});
};


exports.addSong = function() {
    return function(req, res) {
        var notes = req.body.notes.split('\r\n');
        var pauses = req.body.pauses.split('\r\n');
        notes = notes.slice(0, notes.length-1);
        pauses = pauses.slice(0, pauses.length-1);

        var song = "";
        for (var i = 0; i < pauses.length; i++) {
            for (var j = 0; j < pauses[i].length; j++) {
                song += notes[i][j] + ',' + pauses[i][j];
            }
            song += notes[i][notes[i].length-1] + ';';
        }
        var command = 'testModule.writeSong("'+song+'")';
        python(command,callback);
        res.location('success');
        res.redirect('success');
    
    }
};