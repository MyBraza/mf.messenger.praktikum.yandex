import Block from "../block";
import template from "./template";
import FormButton from "../button/form-button";

export default class TextInputPopup extends Block {
	props: {
		callback: (value: unknown) => void;
		[key: string]: unknown
	};

	constructor(props: {}, classList: string = '', parent = '') {
		super(props, 'div', parent, template, `text-input-popup ${classList}`);
	}

	componentDidMount() {
		this.childBlocks.button = new FormButton({
			attributes: {class: 'form-button'},
			text: 'Create',
			callback: this.onClick
		});
	}

	componentDidRender() {
		this._attach();
	}

	onClick = () => {
		const input = this._element?.querySelector('input');
		const value = input ? input.value : undefined;
		this.props.callback(value);
		this.hide();
	};

	show() {
		super.show();
		this.childBlocks.button.setProps({callback: this.onClick})
	}

	render(): string {
		let form = this.compile(this.template);
		return form({});
	}
}