const button = document.getElementById('submit-button');

button.addEventListener('click', function (e) {
	e.preventDefault();
	let formName = this.dataset.formName;
	let form = document.forms[formName];
	let formData = new FormData(form);
	let data = {};
	for (let key of formData.keys()) {
		data[key] = formData.get(key);
	}
	console.log(data);
}, false);

const avatar = document.getElementById('image-input'),
	imageInput = document.getElementById('avatar');

if (!(avatar === undefined || avatar === null)) {
	avatar.addEventListener('click', function (e) {
		e.preventDefault();
		imageInput.click();
	}, false);
}
