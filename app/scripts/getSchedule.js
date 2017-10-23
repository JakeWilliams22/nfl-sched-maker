var schedule;
var dates = ["10-06","10-13","10-20","10-27","11-03","11-10","11-17","11-24","12-01","12-08","12-15","12-22","12-29","1-05","1-12","1-19"];
var broadcasters = ["FOX", "NBC", "CBS"];
var pos = -1;
var a_d_sched = '';

$(document).ready(function(){
    $("#generate_schedule_button").click(function(){
        a_d_sched = approved_denied_sched();
        console.log(a_d_sched)
        if (a_d_sched != '') {
          $.post('https://nfl-schedule-algorithm.herokuapp.com/generate-optimized-schedule', {schedule: a_d_sched}, handleScheduleResponse);
          pos = -1
        }
        else
          $.get('https://nfl-schedule-algorithm.herokuapp.com/generate-optimized-schedule', {}, handleScheduleResponse);
    });
    $("#week").change(function() {
        var scheduleTable = $('#exportTlb');
        $("#team").val(0);
        clearTableEntries(scheduleTable);
        var week = this.value;
        if (week > 0) {
            updateScheduleToWeek(week);
        } else if (week == 0) {
            updateScheduleTable(schedule);
        }
    });
    $("#team").change(function() {
        var scheduleTable = $('#exportTlb');
        $("#week").val(0);
        clearTableEntries(scheduleTable);
        var team = this.value;
        if (team == 0) {
            updateScheduleTable(schedule);
        } else {
            updateScheduleToTeam(team);
        }
    });
});

function handleScheduleResponse(data){

    schedule = jQuery.parseJSON(data);
    file = jQuery.parseJSON(data);
    diffScore = file.difficulty_score.toFixed(4);
    travelScore = file.travel_score.toFixed(4);
    schedule = file.sched;
    //$('#exportRules').replaceWith('<label style="float: right; margin-right: 20px">Rules: ' + ruleScore + '</label>');
    $('#exportTravel').replaceWith('<label style="float: right; margin-right: 20px">Difficulty Score: ' + diffScore + '</label>');
    $('#exportDiff').replaceWith('<label style="float: right"> Travel Score: ' + travelScore + '</label>');
    updateScheduleTable(schedule);
}

function updateScheduleTable(schedule, game){
    $('#exportTlb tbody').children('tr').remove();

    for (week in schedule) {
        for (i=0; i< schedule[week].length; i++) {
            date = week.substring(week.indexOf('-')+1, week.indexOf('-')+6);
            game = schedule[week][i];
            $('#exportTlb tbody').append(buildTableRow(date, game));
        }
    }
}

function buildTableRow(date, game) {
    pos++;
    return '<tr><td id="date' + pos + '" name="' + week +'">' + date + '</td><td id="game_time' + pos + '" name="' + game.game_time +'">' + game.game_time 
            + ':00' + '</td><td id="home_team' + pos + '">' + game.home_team 
            + '</td><td id="away_team' + pos + '">' + game.away_team + '</td><td id="broadcaster' + pos + '">' + game.broadcaster 
            + '</td><td align="center"><input type="radio" value="1" class="approval' + pos + '" name="approval' + pos +'"></td>'
            + '<td align="center"><input type="radio" value="-1" class="approval' + pos + '" name="approval' + pos +'"></td>'
            + '<td hidden><input type="radio" value="0" class="approval' + pos + '" name="approval' + pos + '" checked></td></tr>';
}

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function updateScheduleToWeek(weekNum) {
    console.log('update');
    week = dates[weekNum-1];
    var mon = parseInt(week.substring(0,2));
    if (mon >= 10 && mon <= 12) {
        week = "2018-" + week + " 00:00:00";
    } else {
        week = "2019-0" + week + " 00:00:00";
    }
    for (i=0; i< schedule[week].length; i++) {
        date = week.substring(week.indexOf('-')+1, week.indexOf('-')+6);
        game = schedule[week][i];
        $('#exportTlb tbody').append(buildTableRow(date, game));
    }
}

function updateScheduleToTeam(teamName) {
    console.log('update');
    console.log(teamName);
    for (i=0; i<dates.length; i++) {
        week = dates[i];
        var mon = parseInt(week.substring(0,2));
        if (mon >= 10 && mon <= 12) {
            week = "2018-" + week + " 00:00:00";
        } else {
            week = "2019-0" + week + " 00:00:00";
        }
        for (j=0; j<schedule[week].length; j++) {
            game = schedule[week][j];
            console.log(game.away_team);
            date = week.substring(week.indexOf('-')+1, week.indexOf('-')+6);
            if (game.away_team == teamName || game.home_team == teamName) {
                $('#exportTlb tbody').append(buildTableRow(date, game));
            }
        }
    }
}

function clearTableEntries(table) {
    table.find("tr:gt(0)").remove();
}
