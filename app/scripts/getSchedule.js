var schedule;
var dates = ["10-06","10-13","10-20","10-27","11-03","11-10","11-17","11-24","12-01","12-08","12-15","12-22","12-29","1-05","1-12","1-19"];
var pos = -1;
var a_d_sched = '';

$(document).ready(function(){
    //gets generated schedule from backend
    $("#generate_schedule_button").click(function(){
        a_d_sched = approved_denied_sched();
        if (a_d_sched != '') {
            $.post('https://nfl-schedule-algorithm.herokuapp.com/generate-optimized-schedule', {schedule: a_d_sched}, handleScheduleResponse);
            pos = -1
            $('#week option:contains(All)').prop({selected: true});
            $('#team option:contains(All)').prop({selected: true});
        } else {
            $.get('https://nfl-schedule-algorithm.herokuapp.com/generate-optimized-schedule', {}, handleScheduleResponse);
        }
    });
    //filters schedule by week
    $("#week").change(function() {
        var tableBody = document.getElementById("tblBody");
        if (tableBody.rows.length < 3) {
            alert("Please generate schedule before filtering.")
            $('#week option:contains(All)').prop({selected: true});
            return;
        }

        var input = document.getElementById("week");
        var tr = tableBody.getElementsByTagName("tr");
        var selectedWeek = input.options[input.selectedIndex].value;
        if (selectedWeek > 0) {
            var week = dates[selectedWeek - 1];
            
            for (var i = 0; i < tr.length; i++) {
                var td = tr[i].getElementsByTagName("td")[0]; // Only chosen column here is used for filtering
                if (td) {
                    if (td.innerHTML.indexOf(week) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }       
            }
        } else {
            for (var i = 0; i < tr.length; i++) {
                tr[i].style.display = "";
            }
        }
    });
    //filters schedule by team
    $("#team").change(function() {
        var tableBody = document.getElementById("tblBody");
        if (tableBody.rows.length < 3) {
            alert("Please generate schedule before filtering.")
            $('#team option:contains(All)').prop({selected: true});
            return;
        }

        var input = document.getElementById("team");
        var tr = tableBody.getElementsByTagName("tr");
        var selectedTeam = input.options[input.selectedIndex].innerHTML;
        if (selectedTeam == "All") {
            for (var i = 0; i < tr.length; i++) {
                tr[i].style.display = "";
            }
        } else {
            for (var i = 0; i < tr.length; i++) {
                var td1 = tr[i].getElementsByTagName("td")[2]; // Only chosen column here is used for filtering
                var td2 = tr[i].getElementsByTagName("td")[3]; // Only chosen column here is used for filtering
                if (td1 || td2) {
                    if (td1.innerHTML.indexOf(selectedTeam) > -1 
                        || td2.innerHTML.indexOf(selectedTeam) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        } 
    });
});

//parse schedule json
function handleScheduleResponse(data){

    schedule = jQuery.parseJSON(data);
    file = jQuery.parseJSON(data);
    diffScore = file.difficulty_score.toFixed(4);
    travelScore = file.travel_score.toFixed(4);
    ruleScore = file.difficulty_score.toFixed(4);
    if (ruleScore > 0) {
        ruleScore = "passed";
    } else {
        ruleScore = "not passed";
    }
    schedule = file.sched;
    $('#exportRules').replaceWith('<label style="float: right; margin-right: 20px">Rules: ' + ruleScore + '</label>');
    $('#exportTravel').replaceWith('<label style="float: right; margin-right: 20px">Difficulty Score: ' + diffScore + '</label>');
    $('#exportDiff').replaceWith('<label style="float: right"> Travel Score: ' + travelScore + '</label>');
    updateScheduleTable(schedule);
}

//transforms schedule json to an html table
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

//builds row of schedule table
function buildTableRow(date, game) {
    pos++;
    
    var tableRow = '<tr><td id="date' + pos + '" name="' + week +'">' + date + '</td><td id="game_time' + pos + '" name="' 
            + game.game_time +'">' + game.game_time + ':00' + '</td><td id="home_team' + pos + '">' + game.home_team 
            + '</td><td id="away_team' + pos + '">' + game.away_team + '</td><td id="broadcaster' + pos + '">' + game.broadcaster 
            + '</td>';

    if (game.approved == 0) {
        tableRow += '<td align="center"><input type="radio" value="1" class="approval' + pos + '" name="approval' + pos +'"></td>'
            + '<td align="center"><input type="radio" value="-1" class="approval' + pos + '" name="approval' + pos +'"></td>'
            + '<td hidden><input type="radio" value="0" class="approval' + pos + '" name="approval' + pos + '" checked></td>';
    } else if (game.approved == 1) {
        tableRow += '<td align="center"><input type="radio" value="1" class="approval' + pos + '" name="approval' + pos +'" checked></td>'
            + '<td align="center"><input type="radio" value="-1" class="approval' + pos + '" name="approval' + pos +'"></td>'
            + '<td hidden><input type="radio" value="0" class="approval' + pos + '" name="approval' + pos + '"></td>';
    } else if (game.approved == -1) {
        tableRow += '<td align="center"><input type="radio" value="1" class="approval' + pos + '" name="approval' + pos +'"></td>'
            + '<td align="center"><input type="radio" value="-1" class="approval' + pos + '" name="approval' + pos +'" checked></td>'
            + '<td hidden><input type="radio" value="0" class="approval' + pos + '" name="approval' + pos + '"></td>';
    }

    tableRow += '</tr>';
    return tableRow;
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

//clears table
function clearTableEntries(table) {
    table.find("tr:gt(0)").remove();
}