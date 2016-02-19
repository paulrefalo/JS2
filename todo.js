function Todo(id, task, who, dueDate, lat, long) {
    this.id = id;
    this.task = task;
    this.who = who;
    this.dueDate = dueDate;
    this.latitude = latitude;
    this.longitude = longitude;
    this.done = false;
}

var todos = new Array();
var map = null;


// window.onload = init;

function init() {
    
    var latitude = 500;
    var longitude = 500;
    findLocation();

    var submitButton = document.getElementById("submit");
    submitButton.onclick = getFormData;

    getTodoItems();
    
    var searchButton = document.getElementById("searchButton");		// add searchButton with function call
    searchButton.onclick = searchText; 
}

function getTodoItems() {
    if (localStorage) {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.substring(0, 4) == "todo") {
                var item = localStorage.getItem(key);
                var todoItem = JSON.parse(item);
                todos.push(todoItem);
            }
        }
        addTodosToPage();
    }
    else {
        console.log("Error: you don't have localStorage!");
    }
}

function addTodosToPage() {
    var ul = document.getElementById("todoList");
    var listFragment = document.createDocumentFragment();
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        var li = createNewTodo(todoItem);
        listFragment.appendChild(li);
    }
    ul.appendChild(listFragment);
}
function addTodoToPage(todoItem) {
    var ul = document.getElementById("todoList");
    var li = createNewTodo(todoItem);
    console.log("addTodoToPage - are we here");
    ul.appendChild(li);
    document.forms[0].reset();
}


function createNewTodo(todoItem) {
    var li = document.createElement("li");
    li.setAttribute("id", todoItem.id);
    var spanTodo = document.createElement("span");
    
    var aDateString = todoItem.dueDate;   			// calculate the days til task is due
    var aDateMillis = Date.parse(aDateString);
    var now = (new Date()).getTime();
    var diff = aDateMillis - now;
    var tilDue = Math.floor(diff / 1000 / 60 / 60 / 24);
    
    if ( tilDue > 1 ) {						// format days for on page display
        var days = "(" + tilDue + " days remaining)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    } else if ( tilDue <= 1 ) {
        var days = "(due today)";
    } else if ( tilDue < 0 ) {
        tilDue = Math.abs(tilDue);
        var days = "(" + tilDue + " days overdue)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    
    if (todoItem.latitude && todoItem.longitude) {		// format for geolocation or no geolocation
      spanTodo.innerHTML = "(" + todoItem.latitude + ", " + todoItem.longitude + ") " +
          todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate + "  " + days;
    } else {
      spanTodo.innerHTML =
        todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate + "  " + days;
    }

    var spanDone = document.createElement("span");
    if (!todoItem.done) {			
        spanDone.setAttribute("class", "notDone");
        spanDone.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    else {
        spanDone.setAttribute("class", "done");
        spanDone.innerHTML = "&nbsp;&#10004;&nbsp;";
    }
  
    spanDone.onclick = updateDone;						// onclick function for checked/unchecked
    spanDone.onmouseover = googleMap(todoItem.latitude, todoItem.longitude);	// hover event to display map
    
    var spanDelete = document.createElement("span");
    spanDelete.setAttribute("class", "delete");
    spanDelete.innerHTML = "&nbsp;&#10007;&nbsp;";

    spanDelete.onclick = deleteItem;

    li.appendChild(spanDone);
    li.appendChild(spanTodo);
    li.appendChild(spanDelete);
    
    return li;
}
             
function getFormData() {
    var task = document.getElementById("task").value;
    if (checkInputText(task, "Please enter a task")) return;

    var who = document.getElementById("who").value;
    if (checkInputText(who, "Please enter a person to do the task")) return;

    var date = document.getElementById("dueDate").value;
    if (checkInputText(date, "Please enter a due date")) return;
    
    var result = date.match(/^([0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30))))/);
    if (!result) {
        alert("Enter a valid date format");
        return;
    }
    
    var id = (new Date()).getTime();
    
    console.log("latitude is: " + latitude + " and long is: " + longitude);
    
    var todoItem = new Todo(id, task, who, date, latitude, longitude);

    todos.push(todoItem);
    addTodoToPage(todoItem);
    saveTodoItem(todoItem);
}

function checkInputText(value, msg) {
    if (value == null || value == "") {
        alert(msg);
        return true;
    }
    return false;
}



function deleteItem(e) {
    var span = e.target;
    var id = span.parentElement.id;
    console.log("delete an item: " + id);
    
    // find and remove the item in localStorage
    var key = "todo" + id;
    localStorage.removeItem(key);
    
    // find and remove the item in the array
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos.splice(i, 1);
            break;
        }
    }
    
    // find and remove the item in the page
    var li = e.target.parentElement;
    var ul = document.getElementById("todoList");
    ul.removeChild(li);
}   

function updateDone(e) {
    var span = e.target;
    var id = span.parentElement.id;
    //console.log("Toggle done/not done for id: " + id);
   
    var key = "todo" + id;
    var myValue = localStorage.getItem(key);
    console.log("Value object is: " + myValue);
    var objectJSON = JSON.parse(myValue);
    var done = objectJSON.done;
    
    // find and toggle done in the array
      for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
          if (done == true) {
            todos[i].done = false;
          } else {
            todos[i].done = true;
          }
          console.log("array: " + todos[i].done);
          break;
        }
      }
    // update attribute for proper css on page and localStorage setting
    if (done == true) {     
      span.setAttribute("class", "notDone");			// update css for unchecked
      span.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";	// add in the space
      objectJSON.done = false;				// update localStorage to "done":"false"
    } else {
      span.setAttribute("class", "done");			// update css to checked
      span.innerHTML = "&nbsp;&#10004;&nbsp;";			// add in check mark
      objectJSON.done = true;					// update localStorage to "done":"true"
    }
    // update in local storage
    var newObjectJSON = JSON.stringify(objectJSON);
    console.log("newObjectJSON is: " + newObjectJSON);
    localStorage.setItem(key, newObjectJSON);   
}   

function searchText() {
  var re = "";
  var results = [];
  for (var i = 0; i < todos.length; i++) {
    textToSearch = todos[i].who + " needs to " + todos[i].task + " by " + todos[i].dueDate;
    var searchTerm = document.getElementById("searchTerm").value;
    //var textToSearch = document.getElementById("todoList").value;	// "textToSearch"
    //var searchItems = document.getElementById("todoList").getElementsByTagName("span");
   
    console.log(textToSearch);
    
    searchTerm = searchTerm.trim();
    textToSearch = textToSearch.trim(); 
    if (searchTerm == null || searchTerm == "") {
        alert("Please enter a string to search for");
        return;
    }
    if (textToSearch == null || textToSearch == "") {
        alert("Please enter some text to search");
        return;
    }
    
    re = new RegExp(searchTerm, "ig");
    console.log("re is: " + re);
    var match = textToSearch.match(re);			// add var match if textToSearch is a match for searchTerm
    console.log("match is: " + match);
    if (match) {
      results.push(textToSearch);			// if yes, then push the whole todoItem to results array
    }
    console.log("textToSearch is: " + textToSearch);
    
    
  } //end for loop  
  
  if (results == null) {
        alert("No match found");
  } else {
        alert("Found " + results.length + " instances of " + searchTerm);
        showResults(results);
  }
}  

function clearResultsList(ul) {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}

function showResults(results) {
    var ul = document.getElementById("matchResultsList");
    clearResultsList(ul);
    var frag = document.createDocumentFragment();
    for (var i = 0; i < results.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = results[i];
        frag.appendChild(li);
    }
    ul.appendChild(frag);
}            