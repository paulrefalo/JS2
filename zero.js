window.onload = init;

function init() {
    var submit = document.getElementById("submit");
    submit.onclick = math;						// call function math on submit
}

function math() {
    var clearResult = "";
    var operand1 = document.getElementById("operand1").value;		// get operand1, operator, and operand2
    var operator = document.getElementById("operator").value;
    var operand2 = document.getElementById("operand2").value;
    
    console.log("operand1 is: " + operand1);
    console.log("operator is: " + operator);
    console.log("operand2 is: " + operand2);
    
    try {
        if (isNaN(operand1) || operand1 == null || operand1 == "") {	// check for null and isNaN
            result.innerHTML = clearResult;				// clear result
            throw new Error("Enter a number for operand1");		// throw error
        }
        if (isNaN(operand2) || operand2 == null || operand2 == "") {	// check for null and isNaN
            result.innerHTML = clearResult;				// clear result
            throw new Error("Enter a number for operand2");           	// throw error	
        }
        if (operator == "+" || operator == "-" || operator == "/" || operator == "*") {	// check if operator allowed
          if (operator == "/" && operand2 == 0) {					// if dividing, check for 0
              result.innerHTML = clearResult;
              throw new Error("Cannot divide by zero");
          } else {
            var myResult = calculate(operand1,operator,operand2);	// all is well with the input, call function calculate
            result.innerHTML = myResult;				// display result
          }
        } else {
            result.innerHTML = clearResult;				// invalid operator, clear result and throw error
            throw new Error("Enter a valid operator");           
        }
    } catch(ex) {
        alert(ex.message);
    }
    
    console.log("result is: " + myResult);
    
}

function calculate(a,op,b) {
    var x = parseInt(a);
    var y = parseInt(b);
    var r = 0;
    if (op == "+") { r = x + y; return r; }
    if (op == "-") { r = x - y; return r; }
    if (op == "/") { r = x / y; return r; }
    if (op == "*") { r = x * y; return r; } 
}