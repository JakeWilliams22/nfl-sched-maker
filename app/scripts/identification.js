$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'https://nfl-schedule-maker.herokuapp.com/testUsersGet',
        success: function(data) {
            $.each(data, function(index, value) {
                // console.log(value);
            })
        }
    });
    $("#btn_login").click(function(){
        var data = {};
        data.username = $("#login_username").val();
        data.password = $("#login_password").val();
        $.ajax({
            type: 'POST',
            url: 'https://nfl-schedule-maker.herokuapp.com/login',
            data: JSON.stringify(data),
            dataType: 'text',
            contentType: 'application/json',
            success: function(data) {
                if (data == 0) {
                    alert("Incorrect username or password.");
                } else {
                    localStorage.setItem('token', data);
                    window.location.href = "app/index.html";
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
                console.log(textStatus);
                alert("Incorrect username or password.");
                location.reload();
            }
        });
    });
    $("#btn_logout").click(function(){
        var data = {};
        data.token = localStorage.getItem('token');
        var x = confirm("Are you sure to log out?");
        if (x) {
            $.ajax({
                type: 'POST',
                url: 'https://nfl-schedule-maker.herokuapp.com/logout',
                data: JSON.stringify(data),
                dataType: 'text',
                contentType: 'application/json',
                success: function(data) {
                    window.location.href = "../index.html";
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(errorThrown);
                    console.log(textStatus);
                    alert("Some errors happened for logout.");
                    location.reload();
                }
            });           
        }
    });
});