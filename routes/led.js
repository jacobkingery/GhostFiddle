

var gpio = require('pi-gpio');

exports.check = function(req, res){
	var state = 'on';
	gpio.open(12, 'output', function(err){
		gpio.read(12, function(err, value){
			if (err) throw err;
			console.log(value);
			if (value===0) state = 'off';
			gpio.close(12);
		});
	});
	res.render('ledState', {state: state, title: 'LED Status:'});
};

exports.update = function(req, res){
	var state = req.params.state;
	var toWrite = -1;
	if (state === 'on'){
		toWrite = 1;
	} else if (state === 'off'){
		toWrite = 0;
	}
	if (toWrite === -1) {
		res.render('error', {title: 'Error', err: "State must be 'on' or 'off'"});
	} else {
		gpio.open(12, 'output', function(err){
			gpio.write(12, toWrite, function(err){
				if (err) throw err;
				gpio.close(12);
			});
		});
		res.render('ledState', {state: state, title: 'LED Status:'});
	}
};
