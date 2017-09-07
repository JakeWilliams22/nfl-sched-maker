'use strict';

require('rootpath')();
var sched_dict = require('res/schedule_dict');
var pg = require('pg');

var gamesPerTeam = 16;
var numGames = 256;

function getRandomSchedule(req, res, next) {
  var nfl_teams = sched_dict.nfl_teams;
  nfl_teams.resetNumGames();
  var gamesgam = [];
  
  for(var teamNum = 0; teamNum < 31; teamNum = teamNum + Math.floor(Math.random() * 2)) {
    var team = nfl_teams[teamNum];
    for(var gamesPlayed = team.numGames; gamesPlayed < 16; gamesPlayed++) {
      var opponent = nfl_teams[(teamNum + 1) % 32];
      for(var possibleOpponentNum = Math.floor(Math.random()*32); possibleOpponentNum < 32; possibleOpponentNum++) {
        var potentialOpponent = nfl_teams[possibleOpponentNum];
        if (potentialOpponent.numGames < opponent.numGames && possibleOpponentNum != teamNum
              && team.opponentList.indexOf(potentialOpponent.mascot) == -1) {
          opponent = potentialOpponent;
        }
      }
      
      team.numGames = team.numGames + 1;
      opponent.numGames = opponent.numGames + 1;
      
      team.opponentList.push(opponent.mascot);
      opponent.opponentList.push(team.mascot);
      
      var game = [team, opponent];
      
      // team.gameList.push(game);
      // opponent.gameList.push(game);
      
      games.push(game);
    }
  }
  
  console.log("done");
  res.send(games);
}

function makeScheduleFromTeams(teamList) {
  var schedule = {};
  
  for(var i = 0; i < 16; i++) {
    var usedTeams = [];
    schedule[i] = [];
    for(var teamNum = 0; teamNum < 32; teamNum++) {
      if (!(teamNum in usedTeams)) {
        var game = teamList[teamNum].gameList.pop();
        schedule[i].push(game);
        
      }
    }
    
  }
}




function fakeSched(req, res, next) {
  var nfl_teams = sched_dict.nfl_teams;
  var schedule = {};
  for(var i = 0; i <16; i++) {
    schedule[i+1] = [];
    for(var team = 0; team < 16; team++) {
      schedule[i+1].push([nfl_teams[team], nfl_teams[(team + i)%16 + 16]]);
    }
  }
  
  res.send(schedule);
}

exports.fakeSchedule = fakeSched;
exports.getRandomSchedule = getRandomSchedule;




































