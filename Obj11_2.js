window.onload = init;

function init() {
    var datetime = document.getElementById("datetime");
    var time1 = new Date(2000, 0, 1);
    var time2 = new Date(2100, 0, 1);
    var diffInDays = (time2 - time1) / 1000 / 60 / 60 / 24;
    days.innerHTML = diffInDays;
}   