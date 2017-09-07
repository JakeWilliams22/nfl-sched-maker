'use strict';

require('rootpath')();
var pg = require('pg');
var dbUtils = require('controllers/dbSetup')
var scheduleController = require('controllers/scheduleController');

module.exports = function(app, router) {
  router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', ' Access-Control-Allow-Origin: http://nfl-schedule-maker.herokuapp.com/', 'X-Requested-With, Authorization, Content-Type, Username, Password, Token');
    next();
  });
  
  router.get('/', function(request, response) {
    response.send('WELCOME COLE')
  });
  
  router.get('/createPreferencesTable',dbUtils.createPreferencesTable)
  
  router.get('/testPreferenceInsert', dbUtils.testPreferenceInsert)
  
  router.get('/testPreferenceGet', dbUtils.testPreferenceGet);

  router.get('/getRandomSchedule', scheduleController.getRandomSchedule);

  router.get('/dummySchedule',scheduleController.fakeSchedule);
  
  app.use(router);
};
