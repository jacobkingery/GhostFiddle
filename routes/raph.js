var fs = require('fs');

exports.line = function(req, res) {
	res.render('raph', {title: 'Raphael Line Test'});
};

exports.success = function(req, res) {
	res.render('success', {title: 'Raphael Line Test'});
};

exports.addSong = function() {
	return function(req, res) {
		var glass0 = req.body.glass0;

		fs.writeFile("./data/song0.txt", glass0, function(err) {
    		if(err) {
    			console.log(err);
    		} else {
   				console.log("The file was saved!");
				res.location('success');
				res.redirect('success');
			}
		});
	}
};