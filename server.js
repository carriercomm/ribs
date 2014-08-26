'use strict';

var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var application = express(),
    configuration = require('./configuration/development'),
    database = mongoose.connect(configuration.database.url);

application.set('port', process.env.PORT || 3000);
application.set('views', path.join(__dirname, 'frontend', 'views'));
application.set('view engine', 'jade');
application.use(bodyParser.json());
application.use(bodyParser.json({ type: 'application/vnd.api+json' }));
application.use(bodyParser.urlencoded({ extended: true }));
application.use(methodOverride('X-HTTP-Method-Override'));
application.use(express.static(path.join(__dirname, 'frontend')));

require('./backend/api')(application);

application.get('*', function(request, result) {
    result.render('index');
});

application.listen(application.get('port'));

console.log('Server started on port ' + application.get('port'));
