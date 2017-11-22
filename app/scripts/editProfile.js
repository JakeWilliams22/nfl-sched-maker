$(document).ready(function() {
    var data = {};
    var uName = "ecooper5";
    data.username = uName;
    $.ajax({
        type: 'POST',
        url: 'https://nfl-schedule-maker.herokuapp.com/getUser',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
            $('input[name="rg-fName"]').val(data[0].fname);
            $('input[name="rg-lName"]').val(data[0].lname);
            $('input[name="rg-email"]').val(data[0].email);
        }
    });

    $("#edit_profile").click(function() {
        var data = {};
        data.fname = $("#fName").val();
        data.lname = $("#lName").val();
        data.email = $("#email").val();
        data.username = uName;
        console.log("test");
        console.log(data);
        $.ajax({
            type: 'POST',
            url: 'https://nfl-schedule-maker.herokuapp.com/updateUser',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                console.log('success');
                console.log(data);
                alert("Information has been successfully updated!");
            },
            error: function (data) {
                console.log('error');
                console.log(data);
                alert("Information has been successfully updated!");
            }
        });
    });
});