import Block from "../block";
import template from "./template";

export default class FormButton extends Block {
	props: {
		callback?: (() => void),
		[key: string]: unknown
	};

	constructor(props: {}, classList: string = '', parent = '') {
		super(props, 'div', parent, template, `form-button-container ${classList}`);
	}

	componentDidMount() {
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