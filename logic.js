var value = null;
var input = [0];
var operator = null;
var decimal = false;
var cleared = true;
var counter = 0;
var newOperation = false;
var buttons = document.getElementsByTagName("button");

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
	}
}

display();


function numClick() {
	if(cleared) {
		input.pop();
		cleared = false;	
	}

	/*if(newOperation) { 
		value = Number(input.join(''));
		input = []; 
		newOperation = false;
	}*/
	
	input.push(this.innerHTML);
	display();	
};

function clear() {
	value = null;
	input = [0];
	operator = null;
	decimal = false;
	cleared = true;
	counter = 0;
	newOperation = false;

	display();
}

function decimalClick() {
	if(!decimal) {
		input.push(".")
		decimal = true;
		if(cleared) { cleared = false; }
	}
	display();
}

function toggleNegative() {
	if(input[0] === "-") {
		input.shift()
	} else {
		input.unshift("-")
	}
	display();
}

function setOperation() {
	if(operator !== null) {
		removeActive();
	}
	operator = this.id;
	this.classList.add("active");

	if(value === null) { 
		value = Number(input.join(''));
		input = [];
	} else {
		operate();
		display();
		input = [];
	}	
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
	input = [value];
}

//TODO: functionality after clicking twice or at wrong time
function equals() {
	removeActive();
	operate();
	display();
}

function removeActive() {
	document.getElementsByClassName("active")[0].classList.remove("active");
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
	console.log(input.join(''))
	document.getElementById("screen").innerHTML = input.join('');
}