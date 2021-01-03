import Block from "../block.js";
import template from "./template.js";
import FormInput from "../form-input/form-input.js";
import FormButton from "../button/form-button.js";
import formItemsHelper from "../../utils/formItemsHelper.js";
import createChildBlocks from "../../utils/create-child-blocks.js";
import Router from "../../utils/router.js";
import paths from "../../utils/paths";
import FormWindowController from "./form-window-controller";

formItemsHelper();

interface Props {
	requestURL: string;
	items: {
		[key: string]: {
			[key: string]: string;
		}
	};
	button: {
		attributes: { [key: string]: string };
		text: string;
		render?: string;
	}
	link?: {
		href: string,
		text: string,
	}

	[key: string]: unknown
}

export default class FormWindow extends Block {
	childBlocks: {
		[id: string]: FormInput | FormButton
		button: FormButton
	};
	controller: FormWindowController;
	props: Props;

	constructor(props: Props, classList: string = 'form-window__authorization-page', parent = '') {
		super(props, 'main', parent, template, classList);
		this._attach();
		const form = this._element?.querySelector('form');
		const link = this._element?.querySelector('.form-button__link');
		link?.addEventListener('click', () => {
			if (this.props.link) {
				Router.getInstance().go(this.props.link.href);
			}
		});
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
			let form = <HTMLFormElement>event.target;
			if (form) {
				let formData = new FormData(form);
				let data: { [key: string]: unknown } = {};
				for (let key of formData.keys()) {
					data[key] = formData.get(key);
				}
				if(window.location.pathname === paths.authorization) {
					this.controller.signIn(data);
				}
				if(window.location.pathname === paths.registration) {
					this.controller.signUp(data);
				}
			}
		}
	}

	show() {
		this.controller.logOut();
		super.show();
	}

	componentDidMount() {
		this.controller = new FormWindowController();
		const {items, button} = this.props;
		createChildBlocks(items, this.childBlocks);
		this.childBlocks.button = new FormButton(button, '', '.form-window__buttons');
	}

	render(): string {
		let form = this.compile(template);
		return form(this.props);
	}
}
