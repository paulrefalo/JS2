window.onload = init;

function init() {
    var datetime = document.getElementById("datetime");
    var aDate = new Date();
    aDate.setFullYear(2100);
    aDate.setMonth(11);
    aDate.setDate(21);
    aDate.setHours(18);
    aDate.setMinutes(00);
    aDate.setSeconds(00);
    // var timeSet = new Date(2100, 11, 21, 18);
    datetime.innerHTML = aDate.toLocaleString();
}      