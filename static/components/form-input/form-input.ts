import Block from "../block.js";
import template from "./template.js";

export default class formInput extends Block {
	constructor(props: {}, classList: string, parent = '') {
		super('div', props, parent, template, `form-input ${classList}`);
		const input = this._element?.querySelector('input');
		input?.addEventListener('focus', this.validator.bind(this));
		input?.addEventListener('blur', this.validator.bind(this));
	}

	validator = (event: Event | null = null): boolean => {
		event?.preventDefault();
		const input = this._element?.querySelector('input');
		const alert = this._element?.querySelector('p');
		if (input !== null && input !== undefined) {
			if (input.value.length === 0) {
				input.classList.add('error');
				if (alert) {
					alert.textContent = 'Поле обязятельно для ввода';
					alert.style.display = 'block';
				}
				return false;
			}
			if (input.type === 'email' && input.value.indexOf('@') === -1) {
				input.classList.add('error');
				if (alert) {
					alert.textContent = 'Некорректный электронный адрес';
					alert.style.display = 'block';
				}
				return false;
			}
			input.classList.remove('error');
			if (alert) alert.style.display = 'none';
			return true;
		}
		return false;
	};

	render(): string {
		let form = this.compile(this.template);
		return form(this.props);
	}
}