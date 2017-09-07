'use strict';

require('rootpath')();

var nfl_teams = {
  0: new NFL_TEAM('Arizona', 'Cardinals'),
  1: new NFL_TEAM('Atlanta', 'Falcons'),
  2: new NFL_TEAM('Baltimore', 'Ravens'),
  3: new NFL_TEAM('Bufalo', 'Bills'),
  4: new NFL_TEAM('Carolina', 'Panthers'),
  5: new NFL_TEAM('Chicago', 'Bears'),
  6: new NFL_TEAM('Cincinnati', 'Bengals'),
  7: new NFL_TEAM('Cleveland', 'Browns'),
  8: new NFL_TEAM('Dallas', 'Cowboys'),
  9: new NFL_TEAM('Denver', 'Broncos'),
  10: new NFL_TEAM('Detroit', 'Lions'),
  11: new NFL_TEAM('Green Bay', 'Packers'),
  12: new NFL_TEAM('Houston', 'Texans'),
  13: new NFL_TEAM('Indianapolis', 'Colts'),
  14: new NFL_TEAM('Jacksonville', 'Jaguars'),
  15: new NFL_TEAM('Kansas City', 'Chiefs'),
  16: new NFL_TEAM('Miami', 'Dolphins'),
  17: new NFL_TEAM('Minnesota', 'Vikings'),
  18: new NFL_TEAM('New England', 'Patriots'),
  19: new NFL_TEAM('New Orleans', 'Saints'),
  20: new NFL_TEAM('New York', 'Giants'),
  21: new NFL_TEAM('New York', 'Jets'),
  22: new NFL_TEAM('Oakland', 'Raiders'),
  23: new NFL_TEAM('Philadelpia', 'Eagles'),
  24: new NFL_TEAM('Pittsburgh', 'Steelers'),
  25: new NFL_TEAM('San Diego', 'Chargers'),
  26: new NFL_TEAM('San Francisco', '49ers'),
  27: new NFL_TEAM('Seattle', 'Seahawks'),
  28: new NFL_TEAM('St. Louis', 'Rams'),
  29: new NFL_TEAM('Tampa Bay', 'Buccaneers'),
  30: new NFL_TEAM('Tennessee', 'Titans'),
  31: new NFL_TEAM('Washington', 'Redskins')
}

nfl_teams.resetNumGames = function() {
  for (var i = 0; i <= 31; i++) {
    this[i].numGames = 0;
    this[i].opponentList = [];
  }
}

function NFL_TEAM(city, mascot) {
  this.city = city;
  this.mascot = mascot;
  this.numGames = 0;
  this.opponentList = [];
  this.gameList = [];
}

NFL_TEAM.hasGameScheduledAgainst = function(mascot) {
  return 0;
}

NFL_TEAM.prototype.toString = function() {
  return this.mascot;
}

exports.NFL_TEAM = NFL_TEAM;
exports.nfl_teams = nfl_teams;