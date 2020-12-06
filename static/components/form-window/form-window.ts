import Block from "../block.js";
import template from "./template.js";
import formInput from "../form-input/form-input.js";
import formButton from "../button/form-button.js";
import formItemsHelper from "../../js/formItemsHelper.js";

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

export default class formWindow extends Block {
	childBlocks: {
		[id: string]: formInput | formButton
		button: formButton
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
			if (item instanceof formInput) {
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
		for (let item in this.props.items) {
			if (this.props.items.hasOwnProperty(item) && !skip.includes(item) && item !== 'button') {
				let itemProps = Object.assign({}, this.props.items[item]);
				itemProps.id = item;
				let neighbor = itemProps.with !== undefined ? itemProps.with : undefined;
				if (neighbor !== undefined && !skip.includes(neighbor)) {
					let neighborProps = Object.assign({}, this.props.items[neighbor]);
					neighborProps.id = neighbor;
					this.childBlocks[neighbor] = new formInput(neighborProps, 'form-window__item', `#${item}-container`,);
					skip.push(neighbor);
				}
				this.childBlocks[item] = new formInput(itemProps, 'form-window__item', `#${item}-container`,);
			}
		}
		this.childBlocks.button = new formButton(this.props.button, undefined, '', '.form-window__buttons');
	}

	render(): string {
		let form = this.compile(template);
		return form(this.props);
	}
}
