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
        var notes = req.body.notes;
        var pauses = req.body.pauses;
        var song = "";

        for (var i = 0; i < pauses.length; i++){
            song += notes[i] + pauses[i];
        }
        song += notes[notes.length];

        fs.writeFile("./data/song0.txt", notes, function(err) {
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