"use strict"; 
document.addEventListener("DOMContentLoaded", function() {
 	// alert("loaded");
 	function testFunc() {
		validate();
		// console.log(userErrors);
		// console.log(displayErros(er));
	};



 	document.getElementById("submit").addEventListener("click", validate);

// initialize constants
	// error messages
 	const errors = {
  	present: "This field can not be empty",
  	textFormat: "This field can not contain ' and \" symbols",
  	emailFormat: "<br>Please, enter a valid email"
	};

	// ids of all form fields
	const fieldIds = ["firstName", "lastName", "birthday", "gender", "country", "email", "password", "address", "textarea"]
	// console.log(fieldIds)
	// ids for presence validation
	const presenceIds = fieldIds.slice(0).splice(0,fieldIds.length - 1);
	
	// ids for text format validation
	const textFormatIds = fieldIds.slice(0);
	textFormatIds.splice(2,4);


	//RegExp
	const formatRegExp = /['"]/g;
	const emailRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // got from stackoverflow. thanks guys :)
//////end of block///////

// add datepicker. P.S. the only place jQuery selector is used, couldn't do it wiht vanila js :(
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

// helper functions for validate()
	function checkPresence(data) {
		return data.length == 0; // true if no data provided
	}

	function checkTextFormat(data) {
		return formatRegExp.test(data); //true if data format is not accepted
	}

	function checkEmailFormat(data) {
		return emailRegExp.test(data); // true if email is valid
	}

	function getUserInput(keys) {
		let userInput = {};
		for (let i = 0; i < keys.length; i++) {
			userInput[keys[i]] = document.getElementById(keys[i]).value;
			// special treatment for gender
			if (keys[i] == "gender") {
				let radios = document.getElementsByName('radios');
				for (let j = 0; j < radios.length; j++) {
				  if (radios[j].checked) {
				  	userInput[keys[i]] = "1";
				  	break;
				 	}
				}
				continue;
			} //end special treatment
		}
		console.log(userInput);
		return userInput;
	}

	// remove red border when user filled the field
	function changeBorder() {
		let elements = document.querySelectorAll(".errors");
		elements.forEach(function(elem) {
		    elem.addEventListener("change", function() {
		      removeErrorAndStyle(elem.id);
		    });
			});
		}

//////end of block///////

// this block of func checks errors and applies or removes error messages and styles 
// if submit button is pressed again
	function displayErros(errors) {
		let keys = Object.keys(errors);
		for (let key of keys) {
			// console.log(errors[key]);
			errors[key].length == 0 ? removeErrorAndStyle(key) : addErrorAndStyle(key, errors[key]);				
			}
	}

	function addErrorAndStyle(key, error) {
		document.getElementById(key + 'Error').innerHTML = error;
		document.getElementById(key).classList.add("errors");	
	}

	function removeErrorAndStyle(key) {
		document.getElementById(key + 'Error').innerHTML = "";
		document.getElementById(key).classList.remove("errors");	
	}
//////end of block///////

// validate user input on submit
	function validate() {
		let userErrors = {};
		let errorCount = 0;
		for (let i = 0; i < fieldIds.length; i++) {
			userErrors[fieldIds[i]] = []; //initialise errors' keys
		}
		let userInput = getUserInput(fieldIds);
		// console.log(userInput);
		for (let i = 0; i < presenceIds.length; i++) {
			if (checkPresence(userInput[presenceIds[i]])) {
				userErrors[presenceIds[i]].push(errors.present);
				errorCount++;
			}
		}
		for (let i = 0; i < textFormatIds.length; i++) {
			if (checkTextFormat(userInput[textFormatIds[i]])) {
				userErrors[textFormatIds[i]].push(errors.textFormat);
				errorCount++;
			}
		}
		if (!(checkEmailFormat(userInput.email))) {
			userErrors.email.push(errors.emailFormat)
			errorCount++;
		}
		errorCount == 0 ? alert("Congratulations! You have successfully manifested Yourself") : displayErros(userErrors); 
		changeBorder();
	}
});
//////end of block///////
	



