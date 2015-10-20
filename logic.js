var value = null;
var input = [0];
var operator = null;
var size = 2.5;
var counter = 0;
var newOperation = true;
var prevNum = null;
var buttons = document.getElementsByTagName("button");
var ee = false;
home();

for (var i = 0; i < buttons.length; i++) {
	switch(buttons[i].classList[0]) {
		case "number":
			buttons[i].addEventListener("click", numClick);
			break;
		case "clear":
			buttons[i].addEventListener("click", clear);
			break;
		case "decimal":
			buttons[i].addEventListener("click", decimalClick);
			break;
		case "posneg":
			buttons[i].addEventListener("click", toggleNegative);
			break;
		case "operator":
			buttons[i].addEventListener("click", setOperation);
			break;
		case "equals":
			buttons[i].addEventListener("click", equals);
			break;
		case "percent":
			buttons[i].addEventListener("click", percentage);
			break;
		case "home":
			buttons[i].addEventListener("click", egg);
			break;
	}
}

display();

Array.prototype.includes = function(item) {
	for(var i = 0; i < this.length; i++) {
		if(this[i] === item) {
			return true;
		}
	}
	return false;
};

function numClick() {
	if(!ee) {
		if(newOperation) {
			input = [];	
		}
		input.push(this.innerHTML);
		display();	
		newOperation = false;
	}
};

function clear() {
	value = null;
	input = [0];
	operator = null;
	decimal = false;
	ee = false;
	counter = 0;
	newOperation = true;
	removeActive();
	reset();
	display();

}

function decimalClick() {
	if(!ee) {
		if(!input.includes(".")) {
			input.push(".");
		}
		display();
	}
}

function percentage() {
	if(!ee) {
		var num = Number(input.join(''));
		num = num * .01;
		input = String(num).split('');
		display();
	}
}

function toggleNegative() {
	if(!newOperation) {
		if(input[0] === "-") {
			input.shift()
		} else if (input[0][0] === "-") {
			//TODO: if input[0] is value, do not add new - sign
		} else {
			input.unshift("-")
		}
	}
	display();
}

function setOperation() {
	// If an operator button is active, remove the active class
	if(operator !== null) {
		removeActive();
	} else {
		// Change operator to this if there is no operator
		operator = this.id;
	}

	

	// Add the active class to the operator button clicked
	this.classList.add("active");

	//alert(input);
	//console.log("input = " + input);
	//console.log("newOperation: " + newOperation);

	// If internal value is null, give it the value of the input so far
	if(value === null) { 
		value = Number(input.join(''));
	} else {
		if(!newOperation && input !== []) {
			operate();
			display();
		} 
	}
	
	newOperation = true;
	// Set operator to this after the previous operation has been done
	operator = this.id;
}

function operate() {
	var num = Number(input.join(''));
	switch(operator) {
		case "multiply":
			value = multiply(value,num);
			break;
		case "divide":
			value = divide(value,num);			
			break;
		case "subtract":
			value = subtract(value,num);
			break;
		case "add":
			value = add(value,num);
			break;	
	}
	input = String(value).split('');
	return num;
}


function equals() {
	if(value !== null && !ee) {
		removeActive();
		if(newOperation) {
			input = [prevNum];
		}
		prevNum = operate();
		display();
		newOperation = true;
	}
}

function removeActive() {
	var activeElements = document.getElementsByClassName("active");
	if(activeElements.length > 0) {
		activeElements[0].classList.remove("active");
	}	
}

function multiply(a,b) {
	return a * b;
}

function divide(a,b) {
	return a / b;
}

function subtract(a,b) {
	return a - b;
}

function add(a,b) {
	return a + b;
}

function display() {
	var output = input.join('');
	if(output.length > 6 && !ee) {
		output = Number(output).toExponential();
	} 
	document.getElementById("screen").innerHTML = output;
}

function home() {
	var homeButton = "<button class ='home'></button>"
	document.getElementById("iphone").innerHTML += homeButton;
}

function egg() {
	document.getElementById("screen").style.fontSize = "20px";
	ee = true;
	var easter;
	if(input.join('') === "1314") {
		easter = "Forever";
	} else if(input.join('') === "1012") {
		easter = "Happy Birthday!";
	} else {
		var random = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
		switch(random) {
			case 1:
				easter = "Mathematical!"
				break;
			case 2:
				easter = "Algebraic!"
				break;
			case 3:
				easter = "CAN NOT COMPUTE!"
				break;
			case 4:
				easter = "1001000 1101001!"
				break;
			case 5:
				easter = "I AM CALCULATOR!"
				break;
		}
	}
	input = [easter];
	display();
}

function reset() {
	document.getElementById("screen").style.fontSize = "40px";

}