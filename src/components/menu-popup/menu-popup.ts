import Block from 'components/block';
import template from './template';

export default class TextInputPopup extends Block {
	props: {
		items: {
			[key: string]: { [key: string]: unknown }
		}
	};

	constructor(props: Record<string, unknown>, classList = '', parent = '') {
		super(props, 'div', parent, template, `text-input-popup ${classList}`);
	}

	render(): string {
		const form = this.compile(this.template);
		return form({});
	}
}
