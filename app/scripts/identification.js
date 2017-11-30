$(document).ready(function() {
    var a = [];    
    $.ajax({
        type: 'GET',
        url: 'https://nfl-schedule-maker.herokuapp.com/testUsersGet',
        success: function(data) {
            $.each(data, function(index, value) {
                console.log(value);
                a.push(value);
            })
        }
    });
    $("#btn_login").click(function(){
        var data = {};
        data.username = $("#login_username").val();
        data.password = $("#login_password").val();
        console.log(data);
        console.log(a);
        for (var i = 0; i < a.length; i++) {
            if (data.username === a[i].username && data.password === a[i].password) {
                data.fname = a[i].fname;
                data.lname = a[i].lname;
                data.email = a[i].email;
                break;
            }
        }
        $.ajax({
            type: 'POST',
            url: 'https://nfl-schedule-maker.herokuapp.com/login',
            data: JSON.stringify(data),
            dataType: 'text',
            contentType: 'application/json',
            success: function(value) {
                if (value == 0) {
                    alert("Incorrect username or password.");
                } else {
                    console.log(data);

                    localStorage.setItem('token', value);
                    console.log(localStorage.getItem('token'));
                    
                    localStorage.setItem('fname', data.fname);
                    console.log(localStorage.getItem('fname'));

                    localStorage.setItem('lname', data.lname);
                    console.log(localStorage.getItem('lname'));

                    localStorage.setItem('email', data.email);
                    console.log(localStorage.getItem('email'));

                    localStorage.setItem('username', data.username);
                    console.log(localStorage.getItem('username'));

                    localStorage.setItem('password', data.password);
                    console.log(localStorage.getItem('password'));
                    
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
                    localStorage.removeItem('token');
                    localStorage.removeItem('fname');
                    localStorage.removeItem('lname');
                    localStorage.removeItem('email');
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');
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