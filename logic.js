var value = 0;
var x = [0];
var y = [];
var operator = null;
var decimal = false;
var cleared = true;

var buttons = document.getElementsByTagName("button");

for (var i = 0; i < buttons.length; i++) {

	switch(buttons[i].className) {
		case "number":
			buttons[i].addEventListener("click", numClick);
			break;
		case "operator":
			buttons[i].addEventListener("click", setOperator);
			break;
		case "clear":
			buttons[i].addEventListener("click", clear);
			break;
		case "decimal":
			buttons[i].addEventListener("click", decimalClick);
			break;
	}

	
}

function compileNumber(numArray) {
	return Number(numArray.join(''));
};

function display(numArray) {
	document.getElementById("screen").innerHTML = numArray.join('');
};

function decimalClick() {
	if(!decimal) {
		x.push(".");
		decimal = true;
	}
	display(x);
};

function numClick() {
	if(cleared) {
		x.pop();
		cleared = false;	
	}
	x.push(this.innerHTML);
	display(x);
	
};

function clear() {
	x = [0];
	y = [];
	operator = null;	
	decimal = false;
	display(x);
	cleared = true;
};

function setOperator() {
	alert("operation");
};



clear();