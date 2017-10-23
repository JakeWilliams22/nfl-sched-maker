function openCity(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// In the schedule screen, when the user clicks the "generate" button,
// it shows the loading icon until a generated schedule shows up.
function showLoading() {
    var l = document.getElementById("loading");
    var lm = document.getElementById("loadingMsg");
    if (l != undefined && lm != undefined) {
      lm.style.display = "none";
      if (l.style.display == "none") {
          l.style.display = "block";
      } else {
          l.style.display = "none";
      }
    }
}
