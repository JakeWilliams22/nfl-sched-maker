var schedule;
var dates = ["10/1","10/8","10/15","10/22","10/29","11/5","11/12","11/19","11/26","12/3","12/10","12/17","12/25","1/1","1/8","1/15"];
var broadcasters = ["FOX", "NBC", "CBS"]

$(document).ready(function(){
    $("#generate_schedule_button").click(function(){
        httpGetAsync('https://nfl-schedule-algorithm.herokuapp.com/generate-schedule', function(data) {
            schedule = jQuery.parseJSON(data);
            updateScheduleTable(schedule);
        });
    });

    $("#week").change(function() {
        var scheduleTable = $('#exportTlb');
        clearTableEntries(scheduleTable);
        var week = this.value;
        if (week > 0) {
            updateScheduleToWeek(week);
        } else if (week == 0) {
            updateScheduleTable(schedule);
        }
    });
});

function updateScheduleTable(schedule){
    for (week in schedule) {
        for (game in schedule[week]) {
            date = dates[week-1]
            game = schedule[1][game];
            var scheduleTableLastRow = $('#exportTlb tr:last');
            scheduleTableLastRow.after(buildTableRow(date, game));
        }
    }
}

function buildTableRow(date, game){
    var rand = Math.floor(Math.random() * 3);
    return "<tr><td> " + date + "</td><td> 12:00PM </td><td>" + game[0]['mascot'] + "</td><td>" + game[1]['mascot'] + "</td><td>" + broadcasters[rand] + "</td><td><form action=\"\"><input type=\"radio\" name=\"approval\" value=\"yes\">Yes<br><input type=\"radio\" name=\"approval\" value=\"no\">No<br></form></tr>";
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