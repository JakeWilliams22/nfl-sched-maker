var schedule;
var dates = ["10-06","10-13","10-20","10-27","11-03","11-10","11-17","11-24","12-01","12-08","12-15","12-22","12-29","1-05","1-12","1-19"];
var broadcasters = ["FOX", "NBC", "CBS"]

$(document).ready(function(){
    $("#generate_schedule_button").click(function(){
        httpGetAsync('https://nfl-schedule-algorithm.herokuapp.com/generate-schedule', function(data) {
            schedule = jQuery.parseJSON(data);
            updateScheduleTable(schedule);
        });
    });
});

function updateScheduleTable(schedule){
    for (week in schedule) {
        console.log(week);
        for (i=0; i< schedule[week].length; i++) {
            date = week.substring(week.indexOf('-')+1, week.indexOf('-')+6);
            game = schedule[week][i];
            var scheduleTableLastRow = $('#exportTlb tr:last');
            scheduleTableLastRow.after(buildTableRow(date, game));
        }
    }
}

function buildTableRow(date, game){
    var rand = Math.floor(Math.random() * 3);
    return "<tr><td> " + date  + "</td><td>" + game.game_time + ":00" + "</td><td>" + game.home_team + "</td><td>" + game.away_team + "</td><td>" + game.broadcaster + "</td><td><form action=\"\"><input type=\"radio\" name=\"approval\" value=\"yes\">Yes<br><input type=\"radio\" name=\"approval\" value=\"no\">No<br></form></tr>";
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function updateScheduleToWeek(weekNum) {
    for (game in schedule[weekNum]) {
        date = dates[weekNum-1]
        game = schedule[weekNum][game];
        var scheduleTableLastRow = $('#exportTlb tr:last');
        scheduleTableLastRow.after(buildTableRow(date, game));
    }
}

function clearTableEntries(table) {
    table.find("tr:gt(0)").remove();
}