window.onload = init;

function init() {
    var submit = document.getElementById("submit");
    submit.onclick = getDate;
}    
function getDate() {
    var aDateString = document.getElementById("aDate").value;
    if (aDateString == null || aDateString == "") {
        alert("Please enter a date");
        return;
    }
    
    var result = aDateString.match(/^([0-9]{4}\.(((0[13578]|(10|12))\.(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)\.(0[1-9]|[1-2][0-9]|30)))) ((0*[0-9]|10|11|12):([0-5][0-9]))(am|pm)$/);
    if (result) {
        console.log("Date: " + result);
        for (var i = 0; i < result.length; i++) {		// for loop displays all the captured groups
          console.log(i + ": " + result[i]);			// for convenience sake
        }
        var output = "Date: " + result[1] + ", Time: " + result[12] + result[15];
        console.log(output);
    } else {
        alert("Enter a valid date/time format");
        var output = "Arrrgh, try again";
    }
    

    var datetime = document.getElementById("datetime");
    datetime.innerHTML = output;
}       