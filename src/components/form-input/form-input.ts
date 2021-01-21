import Block from 'components/block';
import template from './template';

export default class FormInput extends Block {
	constructor(props: Record<string, unknown>, classList: string, parent = '') {
		super(props, 'div', parent, template, `form-input ${classList}`);
	}

	componentDidRender(): void {
		const input = this._element?.querySelector('input');
		input?.addEventListener('focus', this.validator);
		input?.addEventListener('blur', this.validator);
	}

	validator = (event: Event | null = null): boolean => {
		event?.preventDefault();
		const input = this._element?.querySelector('input');
		const alert = this._element?.querySelector('p');
		if (!input) {
			return false;
		}
		if (input.value.length === 0 && input.dataset.required === 'false') {
			input.classList.remove('error');
			if (alert) alert.style.display = 'none';
			return true;
		}
		if (input.value.length === 0) {
			input.classList.add('error');
			if (alert) {
				alert.textContent = 'Поле обязятельно для ввода';
				alert.style.display = 'block';
			}
			return false;
		}
		if (input.type === 'password' && input.value.length < 8) {
			input.classList.add('error');
			if (alert) {
				alert.textContent = 'Пароль должен содержать хотя бы 8 символов';
				alert.style.display = 'block';
			}
			return false;
		}
		if (input.type === 'tel' && (input.value.length !== 11 || /[^0-9]/g.test(input.value))) {
			input.classList.add('error');
			if (alert) {
				alert.textContent = 'Некорректный номер телефона';
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
	};

	render(): string {
		const form = this.compile(this.template);
		return form(this.props);
	}
}
