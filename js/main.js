"use strict"; 
document.addEventListener("DOMContentLoaded", function() {

// fires validation
	document.getElementById("submit").addEventListener("click", changeColor1);
	document.getElementById("submit1").addEventListener("click", changeColor2);
	document.getElementById("submit2").addEventListener("click", changeColor3);
	document.getElementById("rub").addEventListener("click", rubay);


	function rubay() {
		let elem = document.getElementById("main-cont")
		if (elem.className == "container-fluid white-container") {
			elem.className = "container-fluid black-container"
		}
		else {
			elem.className = "container-fluid white-container"
		}
	}

	function win() {
		if (document.getElementById("main-cont").className == "container-fluid black-container") {
		return true
		}
	}
	function turnOn(id) {
		document.getElementById("b"+id).className = "b"+id+"-on";
	}

	function toggleBulb(id) {
		let elem = document.getElementById("b"+id);
		console.log(elem);
		if(elem.className == "b"+id+"-off") {
		   elem.className = "b"+id+"-on";
		} else {
		   elem.className = "b"+id+"-off";
		}	
	}
// validates user input on submit
	function changeColor1() {
		if (win()) {
			turnOn(1);
			turnOn(2);
			return
		}
		let id1 = Math.floor(Math.random() * 6);
		let id2 = Math.floor(Math.random() * 6);
		while (id1 == id2) {
			id2 = Math.floor(Math.random() * 6);
		}
		toggleBulb(id1);
		toggleBulb(id2);
	}
	function changeColor2() {
		if (win()) {
			turnOn(3);
			turnOn(4);
/*			if (winwin) {
				winner banner
				return
			}*/
			return
		}
		let id1 = Math.floor(Math.random() * 6);
		let id2 = Math.floor(Math.random() * 6);
		while (id1 == id2) {
			id2 = Math.floor(Math.random() * 6);
		}
		toggleBulb(id1);
		toggleBulb(id2);
	}	
	function changeColor3() {
		if (win()) {
			turnOn(5);
			turnOn(0);
			return
		}
		let id1 = Math.floor(Math.random() * 6);
		let id2 = Math.floor(Math.random() * 6);
		while (id1 == id2) {
			id2 = Math.floor(Math.random() * 6);
		}
		toggleBulb(id1);
		toggleBulb(id2);
	}
//////end of block///////
});

