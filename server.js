var express    = require('express');
var app        = express();
var bodyParser = require('body-parser'); 
var morgan     = require('morgan'); 
var mongoose   = require('mongoose'); 
var config     = require('./config');
var path       = require('path');

// Connect to DB
mongoose.connect(config.database);

// Body Parser allows use to grab info from POST requests 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure  app to handle CORS requests
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
  next();
});

app.use(express.static(__dirname + '/public'));

// Log Requests to Console
app.use(morgan('dev'));

// Set Auth Token Secret
var superSecret = config.secret;

// Register Routes for API prefix
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(config.port);
console.log('Magic happens on port ' + config.port);
