let button = document.getElementById('submit-button');
button.onclick = function () {
	let formName = this.dataset.formName,
		form = document.forms[formName],
		formData = new FormData(form),
		data = {};
	for (let key of formData.keys()) {
		data[key] = formData.get(key);
	}
	console.log(data)
};

let avatar = document.getElementById('image-input'),
	imageInput = document.getElementById('avatar');

avatar.onclick = function () {
	imageInput.click();
};