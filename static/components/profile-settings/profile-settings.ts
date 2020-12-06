import Block from "../block.js";
import template from "./template.js";
import formInput from "../form-input/form-input.js";
import formButton from "../button/form-button.js";
import formItemsHelper from "../../js/formItemsHelper.js";

formItemsHelper();

interface Button {
	attributes: { [key: string]: string };
	text: string;
}

interface Props {
	elements: {
		settingsFormInputs: { [key: string]: { [key: string]: unknown; with?: string; } };
		submitButton: Button;
		cancelButton: Button;
		[key: string]: unknown
	}

	onSubmit?: () => void;
	onCancel?: () => void;

	[key: string]: unknown
}

export default class profileSettings extends Block {
	childBlocks: {
		[id: string]: formInput | formButton
	};
	props: Props;

	constructor(props: Props, classList: string, parent = '') {
		super('main', props, parent, template, `profile-settings ${classList}`);
		this._attach();
		const form = this._element?.querySelector('form');
		form?.addEventListener('submit', this.onsubmit.bind(this))
	};

	onsubmit(event: Event) {
		event.preventDefault();
		let flag = true;
		for (let key in this.childBlocks) {
			let item = this.childBlocks[key];
			if (item instanceof formInput) {
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
		let skip: Array<string> = [];
		for (let item in this.props.elements.settingsFormInputs) {
			if (this.props.elements.settingsFormInputs.hasOwnProperty(item) && !skip.includes(item) && item !== 'button') {
				let itemProps = Object.assign({}, this.props.elements.settingsFormInputs[item]);
				itemProps.id = item;
				let neighbor = itemProps.with !== undefined ? itemProps.with : undefined;
				if (neighbor !== undefined && !skip.includes(neighbor)) {
					let neighborProps = Object.assign({}, this.props.elements.settingsFormInputs[neighbor]);
					neighborProps.id = neighbor;
					this.childBlocks[neighbor] = new formInput(neighborProps, 'form-window__item', `#${item}-container`,);
					skip.push(neighbor);
				}
				this.childBlocks[item] = new formInput(itemProps, 'form-window__item', `#${item}-container`,);
			}
		}
		this.childBlocks.submitButton = new formButton(this.props.elements.submitButton, undefined, '', '.form-window__buttons_row');
		this.childBlocks.cancelButton = new formButton(this.props.elements.cancelButton, this.props.onCancel, '', '.form-window__buttons_row');
	}

	render(): string {
		let form = this.compile(template);
		return form(this.props.elements);
	}
}