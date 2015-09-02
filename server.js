var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser')

var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(cookieParser());
app.use(session({secret: '9FJQaUn4uw2nVd8eYPpeQTAZ', resave:true, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, './client')));
app.use(bodyParser.json());
app.listen(8015, function() {
  console.log('Server runs on: 8015');
});

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);