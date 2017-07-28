var express = require('express'),
    bodyParser = require('body-parser'),
	  cors = require('cors'),
    path = require('path'),
    pem = require('pem'),
    https = require('https'),
    app = express(),

    twitchApiController = require('./api/twitchApiController'),

    DIST_DIR =  path.join(__dirname, "dist"),
    HTML_FILE = path.join(__dirname, "dist/index.html"),
    DEFAULT_PORT = 3000;

// Set Express port variable 
app.set("port", process.env.PORT || DEFAULT_PORT);

// static files for Express middleware stack
app.use(express.static(__dirname + '/public')); // images, etc
app.use(express.static(DIST_DIR)); // Angular4

// So we can POST.
app.use(bodyParser.urlencoded({ extended: true }));

// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

// configure routes for twitch api
twitchApiController(app);

// The editor interface.
app.get("/", (req, res) => res.sendFile(HTML_FILE));

// The in-email representation
app.post('/api/resolver', cors(corsOptions), require('./api/resolver'));

/*
  Using a self-signed HTTPS certificate
  -------------------------------------
  HTTPS is required because the requests for your Integration API endpoints are originating 
  from an HTTPS url (https://compose.mixmax.com)
*/
pem.createCertificate({ days: 1, selfSigned: true }, function(err, keys) {
  if (err) throw err;

  https.createServer( {
    key: keys.serviceKey,
    cert: keys.certificate
  }, app).listen(app.get("port"));
});