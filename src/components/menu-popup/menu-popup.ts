import Block from "../block";
import template from "./template";

export default class TextInputPopup extends Block {
	props: {
		items: {
			[key: string]: { [key: string]: unknown }
		}
	};

	constructor(props: {}, classList: string = '', parent = '') {
		super(props, 'div', parent, template, `text-input-popup ${classList}`);
	}

	render(): string {
		let form = this.compile(this.template);
		return form({});
	}
}