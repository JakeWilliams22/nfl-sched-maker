$(document).ready(function() {
    var data = {};
    data.username = localStorage.getItem('username');
    $.ajax({
        type: 'POST',
        url: 'https://nfl-schedule-maker.herokuapp.com/getUser',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
            $('input[name="rg-fName"]').val(localStorage.getItem('fname'));
            $('input[name="rg-lName"]').val(localStorage.getItem('lname'));
            $('input[name="rg-email"]').val(localStorage.getItem('email'));
            $('input[name="rg-pass"]').val(localStorage.getItem('password'));
            $('input[name="rg-user"]').val(localStorage.getItem('username'));
        }
    });

    $("#edit_profile").click(function() {
        var data = {};
        data.fname = $("#fName").val();
        data.lname = $("#lName").val();
        data.email = $("#email").val();
        data.username = localStorage.getItem('username');
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
                // alert("Information has been successfully updated!");
            },
            error: function (data) {
                console.log('error');
                console.log(data);
                alert("Some errors happened!");
            }
        });
    });

    $("#edit_profile").click(function() {
        var data = {};
        data.username = localStorage.getItem('username');
        data.password = $("#pass").val();
        console.log("test");
        console.log(data);
        $.ajax({
            type: 'POST',
            url: 'https://nfl-schedule-maker.herokuapp.com/changePassword',
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
                alert("Some errors happened!");
            }
        });
    });
});