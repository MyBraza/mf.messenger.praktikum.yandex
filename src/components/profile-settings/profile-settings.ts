import Block from "../block.js";
import template from "./template.js";
import FormInput from "../form-input/form-input.js";
import FormButton from "../button/form-button.js";
import formItemsHelper from "../../utils/formItemsHelper.js";
import createChildBlocks from "../../utils/create-child-blocks.js";

formItemsHelper();

interface Button {
	attributes: { [key: string]: string };
	text: string;
}

interface Props {
	elements: {
		formInputs: { [key: string]: { [key: string]: string } };
		buttons :{
			[key:string]: Button
		}
	}

	onSubmit?: () => void;
	onCancel?: () => void;

	[key: string]: unknown
}

export default class ProfileSettings extends Block {
	childBlocks: {
		[id: string]: FormInput | FormButton
	};
	props: Props;

	constructor(props: Props, classList: string, parent = '') {
		super(props,'main',  parent, template, `profile-settings ${classList}`);
		this._attach();
		const form = this._element?.querySelector('form');
		form?.addEventListener('submit', this.onSubmit.bind(this))
	};

	onSubmit(event: Event) {
		event.preventDefault();
		let flag = true;
		for (let key in this.childBlocks) {
			let item = this.childBlocks[key];
			if (item instanceof FormInput) {
				let result = item.validator();
				flag = result ? flag : result;
			}
		}
		if (flag) {
			const callback = this.props.onSubmit ? this.props.onSubmit : () => {
				console.log('form submitted')
			};
			callback();
		}
	}

	componentDidMount() {
		const {formInputs, buttons} = this.props.elements;
		createChildBlocks(formInputs, this.childBlocks);
		this.childBlocks.submitButton = new FormButton(buttons.submitButton, undefined, '', '.form-window__buttons_row');
		this.childBlocks.cancelButton = new FormButton(buttons.cancelButton, this.props.onCancel, '', '.form-window__buttons_row');
	}

	render(): string {
		let form = this.compile(template);
		return form(this.props.elements);
	}
}