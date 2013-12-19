var fs = require('fs');
var python = require('../execPy.js').playSong;

exports.compose = function(req, res) {
    res.render('raph', {title: 'Ghost Fiddle'});
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
                song += notes[i][j] + pauses[i][j];
            }
            song += notes[i][notes[i].length-1] + ';';
        }
        
        python(song);
        
        res.location('success');
        res.redirect('success');
    
    }
};

exports.addPreset = function() {
    return function(req, res) {
        var notes = req.body.notes.split('\r\n');
        var pauses = req.body.pauses.split('\r\n');
        notes = notes.slice(0, notes.length-1);
        pauses = pauses.slice(0, pauses.length-1);

        var song = "";
        for (var i = 0; i < pauses.length; i++) {
            for (var j = 0; j < pauses[i].length; j++) {
                song += notes[i][j] + pauses[i][j];
            }
            song += notes[i][notes[i].length-1] + ';';
        }

        fs.readdir('./data', function(err, files) {
            if(err) {
                console.log(err);
                res.location('failure');
                res.redirect('failure');
            } else {
                console.log(files);
                fs.writeFile("./data/preset"+files.length+".txt", song, function(err) {
                    if(err) {
                        console.log(err);
                        res.location('failure');
                        res.redirect('failure');
                    } else {
                        console.log("The file was saved!");
                        res.location('success');
                        res.redirect('success');
                    }
                });
            }
        });
    }
}
