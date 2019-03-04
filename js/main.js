"use strict"; 
document.addEventListener("DOMContentLoaded", function() {

// fires validation
	document.getElementById("submit").addEventListener("click", validate);

// initializes constants
	// error messages
	const errors = {
		present: "This field can not be empty",
		textFormat: "This field can not contain ' and \" symbols",
		emailFormat: "<br>Please, enter a valid email"
	};

	//RegExp
	const formatRegExp = /['"]/g;
	const emailRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; const secretMessage = "Congratulations! You have successfully manifested Yourself. Don't know really why, but that's ok :)";
	// email regexp credit goes to stackoverflow community. thanks guys :) 
//////end of block///////

// adds datepicker. P.S. this is the only place jQuery selector is used, 
//																			couldn't do it wiht vanila js :(
	(function addDatepicker() {
		$("#birthday").datepicker({ 
			changeMonth: true,
			changeYear: true,
			defaultDate: new Date(1988, 4, 11),
			minDate: new Date(1923, 2 - 1, 26),
			maxDate: "+0D",
			yearRange: '1923:2019'
		});
	})();
//////end of block///////

// adds helper functions for validate()

	function checkPresence(data) {
		return data.length == 0; // returns true if no data provided
	}

	function checkTextFormat(data) {
		return formatRegExp.test(data); //returns true if data format is not accepted
	}

	function checkEmailFormat(data) {
		return emailRegExp.test(data); // returns true if email is valid
	}

	function getUserInput() {
		let formData = document.querySelectorAll('[data-validation]');
		let userInput = {};
		for (let field of formData) {
			userInput[field.id] = field.value;
			// adds special treatment for gender
			if (field.id == "gender") {
				let radios = document.getElementsByName('radios');
				for (let j = 0; j < radios.length; j++) {
					if (radios[j].checked) {
						userInput[field.id] = "1";
						break;
					}
				}
				continue;
			} //end special treatment
		}
		return userInput;
	}

	function initErrorsObj(keys) {
		let userErrors = {};
		for (let key of keys) {
			userErrors[key] = []; // errors are pushed to this arr
		}
		return userErrors;
	}

	// removes red border when user filled the field. Doesn't work with birthday field (because of datepicker). Future fix needed.
	function changeBorder() {
		let elements = document.querySelectorAll(".errors");
		elements.forEach(function(elem) {
				elem.addEventListener("change", function() {
				elem.id == "gender2" ? removeErrorAndStyle(elem.id.slice(0,-1)) : removeErrorAndStyle(elem.id); // nasty gender workaround
				});
			});
		}

//////end of block///////

// checks errors and applies or removes error messages and styles 
// if submit button is pressed again

	function displayErros(errors) {
		let keys = Object.keys(errors);
		for (let key of keys) {
			errors[key].length == 0 ? removeErrorAndStyle(key) : addErrorAndStyle(key, errors[key]);				
			}
	}

	function addErrorAndStyle(key, error) {
		document.getElementById(key + "Error").innerHTML = error;
		document.getElementById(key).classList.add("errors");
		if (key == "gender") {
			document.getElementById(key + "2").classList.add("errors");		
		}
	}

	function removeErrorAndStyle(key) {
		document.getElementById(key + 'Error').innerHTML = "";
		document.getElementById(key).classList.remove("errors");
		if (key == "gender") {
			document.getElementById(key + "2").classList.remove("errors");		
		}	
	}
//////end of block///////

// validates user input on submit
	function validate() {
		let errorCount = 0;
		let userInput = getUserInput();
		let keys = Object.keys(userInput);
		let userErrors = initErrorsObj(keys);
		for (let key of keys) {
			//checks for presence
			if (checkPresence(userInput[key]) && (key != "textarea")) {
				userErrors[key].push(errors.present);
				errorCount++;
			}
			//checks for text format
			switch (key) {
				case 'firstName':
				case 'lastName':
				case 'password':
				case 'address':
				case 'textarea':
					if (checkTextFormat(userInput[key])) {
						userErrors[key].push(errors.textFormat);
						errorCount++;
					}
					continue;
				// checks email
				case "email":
					if (!(checkEmailFormat(userInput[key]))) {
						userErrors[key].push(errors.emailFormat)
						errorCount++;
					}
					continue;
			}
		}
		displayErros(userErrors);
		errorCount == 0 ? alert(secretMessage) : undefined; 
		changeBorder();
	}
//////end of block///////
});
//////end of javascript, hurray! ///////
