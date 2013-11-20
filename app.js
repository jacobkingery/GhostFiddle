var express = require('express'),
    routes = require('./routes'),
    led = require('./routes/led'),
    http = require('http'),
    path = require('path'),
    exec = require('child_process').exec;

var app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/led', led.check);
app.get('/led/:state', led.update);

http.createServer(app).listen(app.get('port'), function(){
  //console.log('Express server listening on port ' + app.get('port'));
});

exec("ifconfig", function(error, stdout, sterr) {
        var beginning = stdout.indexOf("addr:");
        var ending = stdout.slice(beginning).indexOf(" ")
        var ip = stdout.slice(beginning + 5, beginning + ending);

        console.log("Server open at " + ip + ":" + app.get('port'));
});
