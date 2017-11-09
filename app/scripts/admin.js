$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'https://nfl-schedule-maker.herokuapp.com/testUsersGet',
        success: function(data) {
            $.each(data, function(index, value) {
                console.log(value.username);
                $('<option/>').val(value.username).html(value.username).appendTo('#delete_user');
                $('<option/>').val(value.username).html(value.username).appendTo('#reset_password');
            })
        }
    });
    $("#add_user_button").click(function(){
        var data = {};
        data.fName = $("#fName").val();
        data.lName = $("#lName").val();
        data.email = $("#email").val();
        data.username = $("#uName").val();
        data.password = "password";
        data.type = $("#type").val();
        console.log("test");
        console.log(data);
        $.ajax({
            type: 'POST',
            url: 'https://nfl-schedule-maker.herokuapp.com/insertUser',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            success: function(data) {
                console.log('success');
                console.log(data);
                location.reload();
            },
            error: function (data) {
                console.log('error');
                console.log(data);
                location.reload();
            }
        });
    });
    $("#reset_password_button").click(function(){
        var data = {};
        data.username = $('#reset_password').find(":selected").text();
        data.password = "password";
        $.ajax({
            type: 'POST',
            url: 'https://nfl-schedule-maker.herokuapp.com/changePassword',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            success: function(data) {
                console.log('success');
                console.log(data);
                location.reload();
            },
            error: function (data) {
                console.log('error');
                console.log(data);
                location.reload();
            }
        });
    });
    $("#delete_user_button").click(function(){
        var data = {};
        data.username = $('#delete_user').find(":selected").text();
        console.log("test");
        console.log(data);
        $.ajax({
            type: 'POST',
            url: 'https://nfl-schedule-maker.herokuapp.com/deleteUser',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            success: function(data) {
                console.log('success');
                console.log(data);
                location.reload();
            },
            error: function (data) {
                console.log('error');
                console.log(data);
                location.reload();
            }
        });
    });
});