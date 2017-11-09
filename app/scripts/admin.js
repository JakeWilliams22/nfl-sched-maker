$(document).ready(function() {
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
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                alert('text status '+textStatus+', err '+err)
            }
        });
    });
});