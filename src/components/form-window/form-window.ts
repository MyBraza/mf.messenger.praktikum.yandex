import Block from "../block.js";
import template from "./template.js";
import FormInput from "../form-input/form-input.js";
import FormButton from "../button/form-button.js";
import formItemsHelper from "../../script/formItemsHelper.js";

formItemsHelper();

interface Props {
	items: {
		[key: string]: {
			[key: string]: unknown;
			with?: string;
		}
	};
	button: {
		attributes: { [key: string]: string };
		text: string;
		render?: string;
	}

	[key: string]: unknown
}

export default class FormWindow extends Block {
	childBlocks: {
		[id: string]: FormInput | FormButton
		button: FormButton
	};
	props: Props;

	constructor(props: Props, classList: string, parent = '') {
		super('main', props, parent, template, classList);
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
			window.location.href = "home.html";
		}
	}

	componentDidMount() {
		let skip: Array<string> = [];
		const {items, button} = this.props;
		//Эта функция определяет какие инпуты будут лежать в каких элементах
		//Я пытался ее упростить но ничего не приходила на ум
		//Еще одна проблема с этой функцией что она дублируется в ProfileSettings & FormWindow
		//Эту проблему я тоже безуспешно пытался решить,
		//Один из вариантов которые пришли на ум - полностью переписать эти классы, что бы один наследовал этот метод от другого
		//Но я не уверен на сколько подобное решение правильное
		for (let item in items) {
			if (items.hasOwnProperty(item) && !skip.includes(item) && item !== 'button') {
				let itemProps = Object.assign({}, items[item]);
				itemProps.id = item;
				let neighbor = itemProps.with;
				if (neighbor !== undefined && !skip.includes(neighbor)) {
					let neighborProps = Object.assign({}, items[neighbor]);
					neighborProps.id = neighbor;
					this.childBlocks[neighbor] = new FormInput(neighborProps, 'form-window__item', `#${item}-container`,);
					skip.push(neighbor);
				}
				this.childBlocks[item] = new FormInput(itemProps, 'form-window__item', `#${item}-container`,);
			}
		}
		this.childBlocks.button = new FormButton(button, undefined, '', '.form-window__buttons');
	}

	render(): string {
		let form = this.compile(template);
		return form(this.props);
	}
}
