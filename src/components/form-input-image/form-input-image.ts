import Block from "../block.js";
import template from "./template.js";

interface Props {
	[key: string]: unknown
}

export default class FormInputImage extends Block {
	props: Props;

	constructor(props: Props, classList: string = '', parent = '') {
		super(props, 'div', parent, template, `form-input-image ${classList}`);
	};

	componentDidRender() {
		const button = this._element?.querySelector('.form-input-image__button');
		button?.addEventListener('click', this.onClick);
	}

	onClick = () => {
		const input = this._element?.querySelector('input');
		input?.click();
		console.log('click')
	};

	render(): string {
		let {value} = this.props;
		value = value ? value : '/img/placeholder.jpg';
		let form = this.compile(template);
		return form({value});
	}
}