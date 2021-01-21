export default class BaseAPI {
	// На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
	create(data: unknown): void {
		throw new Error(`Not implemented\nData:${data}`);
	}

	request(): void {
		throw new Error('Not implemented');
	}

	update(data: unknown): void {
		throw new Error(`Not implemented\nData:${data}`);
	}

	delete(): void {
		throw new Error('Not implemented');
	}
}
