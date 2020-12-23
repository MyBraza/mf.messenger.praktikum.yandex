import Block from "../block.js";
import template from "./template.js";

Handlebars.registerHelper('properties', function (context, options) {
	let cells = [];
	let html;
	for (let k in context) {
		if (context.hasOwnProperty(k)) {
			html = options.fn({
				key: k,
				value: context[k]
			});
			cells.push(html);
		}
	}
	return cells.join('');
});

export default class FormButton extends Block {
	constructor(props: {}, callback: (() => void)|undefined, classList: string = '', parent = '') {
		super(props,'div',  parent, template, `form-button-container ${classList}`);
		this._element?.addEventListener('click', event => {
			if (callback) {
				event.preventDefault();
				callback();
			}
		});
	}

	render(): string {
		let form = this.compile(this.template);
		return form(this.props);
	}
}