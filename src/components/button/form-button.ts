import Block from "../block.js";
import template from "./template.js";

export default class FormButton extends Block {
	props: {
		callback?: (() => void),
		[key: string]: unknown
	};

	constructor(props: {}, classList: string = '', parent = '') {
		super(props, 'div', parent, template, `form-button-container ${classList}`);
	}

	componentDidRender() {
		this._element?.addEventListener('click', event => {
			if (this.props.callback) {
				event.preventDefault();
				this.props.callback();
			}
		});
	}

	render(): string {
		let form = this.compile(this.template);
		return form(this.props);
	}
}