// Советую по умолчанию использовать const, а let только если очень надо
/*
	Например в такой ситуации

	let answer = null;

	if (isValid()) {
		answer = 42;
		someLogic();
	} else {
		answer = 24;
		someAnotherLogic();
	}

	...
*/
let button = document.getElementById('submit-button');

// Для навешивания обработчиков событий лучше всего использовать addEventListener
button.onclick = function () {
  // Лучше не пользоваться таким синтаксисом, а объявлять переменные по одной.
  // Во-первых это плохо читается
  // Во-вторых, в некоторых ситуациях, браузерные движки могут неверно распарсить такое выражение
  let formName = this.dataset.formName,
    form = document.forms[formName],
    formData = new FormData(form),
    data = {};
  for (let key of formData.keys()) {
    data[key] = formData.get(key);
  }
  console.log(data);
};

let avatar = document.getElementById('image-input'),
  imageInput = document.getElementById('avatar');

avatar.onclick = function () {
  imageInput.click();
};
