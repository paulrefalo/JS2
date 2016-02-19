window.onload = init;

function init() {
    var count = 0;
    try {
        for (var i = 0; i < 10; i++) {
            if (i == 5) {
                throw 5;
            }
            count++;
        }
        alert(count);
    }
    catch (e) {
        alert(e);
    }
    finally {
        alert("we're done!");
    }
}    