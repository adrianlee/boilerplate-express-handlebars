var express = require('express'),
    hbs = require('hbs'),
    app = express();

////////////////////////////////////////////////
// Express Configuration
////////////////////////////////////////////////
app.configure(function() {
  app.set('port', process.argv[2] || process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'), { maxAge: 300000 });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

////////////////////////////////////////////////
// Handlebars
////////////////////////////////////////////////
var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

////////////////////////////////////////////////
// Router
////////////////////////////////////////////////
app.get('/', function(req, res) {
  res.render('index');
});

////////////////////////////////////////////////
// HTTP Server
////////////////////////////////////////////////
app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
