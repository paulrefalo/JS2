window.onload = init;

function init() {
	gettodoList();
}

function gettodoList() {
	var request = new XMLHttpRequest();
	request.open("GET", "todoList.json");
	request.onreadystatechange = function() {
	    var div = document.getElementById("todoList");		// use getElementById to set up output for id="div"
	    var status = document.getElementById("status");		// use getElementById to set up output for id="status"
	    if (this.readyState == this.DONE && this.status == 200) {	// if ready and status 200
	        var type = request.getResponseHeader("Content-Type");
	        console.log("Content-type: " + type);
	        console.log("Status: " + this.statusText);
	        if (this.responseText != null) {			// if there is data loaded
	            div.innerHTML = this.responseText;			// write that data to id="div"
	    	    status.innerHTML = "Status: " + this.statusText;	// write the status to id="status"
	        } else {	            
	            status.innerHTML = "Error: no data<br>Status: " + this.statusText;	// else write the status to id="status"
	        }
	    } else {
	        status.innerHTML = "Status: " + this.statusText + "<br>Error loading the data.";  // write error to id="status"
	    }
	};
	request.send();
}