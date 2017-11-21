$(document).ready(function() {
    var data = {};
    data.username = "ecooper5";
    $.ajax({
        type: 'POST',
        url: 'https://nfl-schedule-maker.herokuapp.com/getUser',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
            console.log(data[0]);
            $('input[name="rg-fName"]').val(data[0].fname);
            $('input[name="rg-lName"]').val(data[0].lname);
            $('input[name="rg-email"]').val(data[0].email);
        }
    });
});