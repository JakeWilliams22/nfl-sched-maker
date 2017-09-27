var schedule;
var dates = ["10-06","10-13","10-20","10-27","11-03","11-10","11-17","11-24","12-01","12-08","12-15","12-22","12-29","1-05","1-12","1-19"];
var broadcasters = ["FOX", "NBC", "CBS"]

$(document).ready(function(){
    $("#generate_schedule_button").click(function(){
        httpGetAsync('https://nfl-schedule-algorithm.herokuapp.com/generate-optimized-schedule', function(data) {
<<<<<<< HEAD
            schedule = jQuery.parseJSON(data);
=======
>>>>>>> 6e7c2818953d4e05c2e1ec01584430110b1017a6
            file = jQuery.parseJSON(data);
            diffScore = file.difficulty_score;
            travelScore = file.travel_score;
            schedule = file.sched;
            $('#exportTravel').append("Travel Score: " + travelScore);
            $('#exportDiff').append("Schedule Difficulty: " + diffScore);
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

function buildTableRow(date, game){
    return '<tr><td> ' + date  + '</td><td>' + game.game_time + ':00' + '</td><td>' + game.home_team 
            + '</td><td>' + game.away_team + '</td><td>' + game.broadcaster 
            + '</td><td><form action=\"\"><div class="row"><div class="col-sm-offset-5 col-sm-2 text-center">' 
            + '<div class="text-center btn-group"><button class="btn btn-success" type="button">Y</button>'
            + '<button class="btn btn-danger" type="button">N</button></div></div></div></form></tr>';
}

function httpGetAsync(theUrl, callback){
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

function clearTableEntries(table) {
    table.find("tr:gt(0)").remove();
}
