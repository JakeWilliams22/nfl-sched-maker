$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'https://nfl-schedule-maker.herokuapp.com/testUsersGet',
        success: function(data) {
            $.each(data, function(index, value) {
                console.log(value);
            })
        },
        error: function(data) {
            alert("No");
        }
    });
    $("#btn_login").click(function(){
        var data = {};
        data.username = $("#login_username").val();
        alert($("#login_username").val());
        data.password = $("#login_password").val();
        alert($("#login_password").val());
        console.log("test");
        console.log(data);
        $.ajax({
            type: 'POST',
            url: 'https://nfl-schedule-maker.herokuapp.com/login',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            success: function(data) {
                console.log('success');
                console.log(data);
                alert(data);
                if (data > 0) {
                    window.location.href = "app/index.html";
                } else {
                    location.reload();
                }
            },
            error: function (data) {
                console.log('error');
                console.log(data);
                alert("Incorrect username or password.");
                location.reload();
            }
        });
    });
});