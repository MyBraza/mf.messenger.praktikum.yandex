export default class BaseAPI {
	// На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
	create(data:unknown) { throw new Error(`Not implemented\nData:${data}`); }

	request() { throw new Error('Not implemented'); }

	update(data:unknown) { throw new Error(`Not implemented\nData:${data}`); }

	delete() { throw new Error('Not implemented'); }
}