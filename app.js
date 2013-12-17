/**
 * Module dependencies.
 */
var express = require('express');
var raph = require('./routes/raph.js');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', raph.line);
app.get('/success', raph.success);
app.get('/failure', raph.failure);

 app.post('/submit', raph.addSong());
//app.post('/submit', raph.addPreset()); // Used to write presets and save to file

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
