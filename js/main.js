"use strict"; 
document.addEventListener("DOMContentLoaded", function() {

// fires validation
	document.getElementById("submit").addEventListener("click", changeColor1);
	document.getElementById("submit1").addEventListener("click", changeColor2);
	document.getElementById("submit2").addEventListener("click", changeColor3);
	document.getElementById("rub").addEventListener("click", rubay);


	function rubay() {
		let elem = document.getElementById("main-cont");
		let elem2 = document.getElementById("rub");
		if (elem.className == "container-fluid white-container") {
			elem.className = "container-fluid black-container"
			elem2.className = "rub-off"
		}
		else {
			elem.className = "container-fluid white-container"
			elem2.className = "rub-on"
		}
	}

	function win() {
		if (document.getElementById("main-cont").className == "container-fluid black-container") {
		return true
		}
	}
	function turnOn(id) {
		document.getElementById("b"+id).className = "b-on";
		if (winwin()) {
			showReward();
			return false
		} else {
			return true
		}
	}

	function toggleBulb(id) {
		let elem = document.getElementById("b"+id);
		if(elem.className == "b-off") {
		   elem.className = "b-on";
		} else {
		   elem.className = "b-off";
		}	
	}
// validates user input on submit
	function changeColor1() {
		if (win()) {
			if (turnOn(1)) {
				turnOn(2);
			}
			return
		}
		let id1 = Math.floor(Math.random() * 6);
		let id2 = Math.floor(Math.random() * 6);
		while (id1 == id2) {
			id2 = Math.floor(Math.random() * 6);
		}
		toggleBulb(id1);
		if (id2 <= 3) {
			toggleBulb(id2);
		}
		if (winwin()) {
			if (Math.floor(Math.random() * 10) <= 2) {
				showReward();
			}
		}
	}
	function changeColor2() {
		if (win()) {
			if (turnOn(3)) {
				turnOn(4);
			}
			return
		}
		let id1 = Math.floor(Math.random() * 6);
		let id2 = Math.floor(Math.random() * 6);
		while (id1 == id2) {
			id2 = Math.floor(Math.random() * 6);
		}
		toggleBulb(id1);
		if (id2 <= 3) {
			toggleBulb(id2);
		}
		if (winwin()) {
			toggleBulb(0);
		}
	}	
	function changeColor3() {
		if (win()) {
			if (turnOn(5)) {
				turnOn(0);
			}
			return
		}
		let id1 = Math.floor(Math.random() * 6);
		let id2 = Math.floor(Math.random() * 6);
		while (id1 == id2) {
			id2 = Math.floor(Math.random() * 6);
		}
		toggleBulb(id1);
		if (id2 <= 3) {
			toggleBulb(id2);
		}
		if (winwin()) {
			toggleBulb(5);
		}
	}

	function winwin() {
		let elem = document.getElementsByClassName("b-on");
		console.log(elem.length)
		if (elem.length == 6) {
			return true
		}
	}

	function showReward() {
		alert("Ура! Ви розв'язали задачу. Перейдіть до наступної сторінки.");
		document.getElementById("final").className += " show";
	}




//////end of block///////
});

