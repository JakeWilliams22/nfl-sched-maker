$(function() {
    $("td").find("p").hide();
    $("a").click(function(event) {
        event.stopPropagation();
        var $target = $(event.target);
        if ( $target.closest("td").attr("colspan") > 1 ) {
            $target.slideUp();
            $target.closest("tr").prev().find("td:last").html("<span class='glyphicon glyphicon-collapse-down'></span>");
        } else {
            $target.closest("tr").next().find("p").slideToggle();
            if ($target.closest("tr").find("td:last").html() == "<span class='glyphicon glyphicon-collapse-down'></span>")
                $target.closest("tr").find("td:last").html("<span class='glyphicon glyphicon-collapse-up'></span>");
            else
                $target.closest("tr").find("td:last").html("<span class='glyphicon glyphicon-collapse-down'></span>");
        }
    });
});