window.onload = init;

var colors = new Array();
var displayColors = new Array();

function init() {
    var submitButton = document.getElementById("submit");
    submitButton.onclick = getColors;
    getLocalColors();
    showColors();
}

function getColors() {
  if (fiveInputs()) {

    // get "color" items from local storage, if any
    for (var ls = 0; ls < localStorage.length; ls++) {
            var key = localStorage.key(ls);
            if (key.substring(0, 5) == "color") {
                var lsColor = localStorage.getItem(key);
                colors.push(lsColor);
            }
    }

    var id = colors.length;					// use length to start adding
    console.log("Colors.length is:  " + colors.length);		// colors at the right place to ls
    for (i = 1; i < 6; i++) {					// loop over to get inputs
      var getColor = "color" + i;
      console.log(getColor);

      var color = document.getElementById(getColor).value;	// if there is an input, setItem to ls
      if (checkInput(color)) {
        console.log(id);
        id++;
        var storeColor = "color" + id;
        localStorage.setItem(storeColor, color);
        displayColor(color);					// and add color to the display
        // colors.push(color);
      } 
      
    }
    colors = [];						// clear array for next submit click
    //console.log(colors);
  } else {
    alert("Please enter five colors to proceed");
    return;
  }
}


function getLocalColors() {					// get colors from ls and then call display
    for (var ls = 0; ls < localStorage.length; ls++) {
        var key = localStorage.key(ls);
        if (key.substring(0, 5) == "color") {
            var lsColor = localStorage.getItem(key);
            displayColors.push(lsColor);	
            console.log("lsColor is: " + lsColor);     
        }
    }
}

function showColors() {						// this function to output all ls colors
    var ul = document.getElementById("colors");			// write to ul id="colors"
    for (var i = 0; i < displayColors.length; i++) {
        var colorsItem = displayColors[i];
        var li = document.createElement("li");			// create an <li>
        li.innerHTML = colorsItem;				// append to <li>
        ul.appendChild(li);
    }
    displayColors = [];
}

function displayColor(color) {					// this function to add from input
    var ul = document.getElementById("colors");
    var li = document.createElement("li");
    li.innerHTML = color;
    ul.appendChild(li);
}

function checkInput(value) {					// check to see if input is null
    if (value == null || value == "") {
        return false;
    }
    return true;
} 

function fiveInputs() {
    var color1 = document.getElementById("color1").value;
    var color2 = document.getElementById("color2").value;
    var color3 = document.getElementById("color3").value;
    var color4 = document.getElementById("color4").value;
    var color5 = document.getElementById("color5").value;
    if ( color1 && color1 && color3 && color4 && color5 ) {
      return true;
    } else {
      return false;
    }
    
}