var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var DIST_DIR = 

app.use(express.static(__dirname + '/public'));

// So we can POST.
app.use(bodyParser.urlencoded({ extended: true }));

// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

