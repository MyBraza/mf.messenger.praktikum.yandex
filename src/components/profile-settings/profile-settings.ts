import Block from "../block.js";
import template from "./template.js";
import FormInput from "../form-input/form-input.js";
import FormButton from "../button/form-button.js";
import formItemsHelper from "../../script/formItemsHelper.js";

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

export default class ProfileSettings extends Block {
	childBlocks: {
		[id: string]: FormInput | FormButton
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
		let skip: Array<string> = [];
		const elements = this.props.elements;
		const settingsFormInputs = elements.settingsFormInputs;
		//Эта функция определяет какие инпуты будут лежать в каких элементах
		//Я пытался ее упростить но ничего не приходила на ум
		//Еще одна проблема с этой функцией что она дублируется в ProfileSettings & FormWindow
		//Эту проблему я тоже безуспешно пытался решить,
		//Один из вариантов которые пришли на ум - полностью переписать эти классы, что бы один наследовал этот метод от другого
		//Но я не уверен на сколько подобное решение правильное
		for (let item in settingsFormInputs) {
			if (settingsFormInputs.hasOwnProperty(item) && !skip.includes(item) && item !== 'button') {
				let itemProps = Object.assign({}, settingsFormInputs[item]);
				itemProps.id = item;
				let neighbor = itemProps.with;
				if (neighbor !== undefined && !skip.includes(neighbor)) {
					let neighborProps = Object.assign({}, settingsFormInputs[neighbor]);
					neighborProps.id = neighbor;
					this.childBlocks[neighbor] = new FormInput(neighborProps, 'form-window__item', `#${item}-container`,);
					skip.push(neighbor);
				}
				this.childBlocks[item] = new FormInput(itemProps, 'form-window__item', `#${item}-container`,);
			}
		}
		this.childBlocks.submitButton = new FormButton(elements.submitButton, undefined, '', '.form-window__buttons_row');
		this.childBlocks.cancelButton = new FormButton(elements.cancelButton, this.props.onCancel, '', '.form-window__buttons_row');
	}

	render(): string {
		let form = this.compile(template);
		return form(this.props.elements);
	}
}