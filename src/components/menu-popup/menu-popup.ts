import Block from "../block.js";
import template from "./template.js";

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