var fs = require('fs');

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
        var notes = req.body.notes.split('\n');
        var pauses = req.body.pauses.split('\n');
        notes = notes.slice(0, notes.length-1);
        pauses = pauses.slice(0, pauses.length-1);

        var song = "";
        for (var i = 0; i < pauses.length; i++) {
            for (var j = 0; j < pauses[i].length; j++) {
                song += notes[i][j] + pauses[i][j];
            }
        }

        fs.writeFile("./data/song0.txt", song, function(err) {
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
};