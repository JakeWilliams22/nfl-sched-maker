$(document).ready(function() {
    var data = {};
    data.username = "ecooper5";
    $.ajax({
        type: 'GET',
        url: 'https://nfl-schedule-maker.herokuapp.com/getUser',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
        }
    });
});