	let a = document.querySelectorAll('[data-validation]');
	function sample(obj) {
		let b = []
		for (let el of obj) {
			b.push(el["id"]);
		}
		console.log(b)
	};
	sample(a);alert("Here");