import Block from 'components/block';
import FormInput from 'components/form-input/form-input';
import FormButton from 'components/button/form-button';
import formItemsHelper from 'utils/formItemsHelper';
import createChildBlocks from 'utils/create-child-blocks';
import Router from 'utils/router';
import paths from 'utils/paths';
import template from './template';
import FormWindowController from './form-window-controller';

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

	constructor(props: Props, classList = 'form-window__authorization-page', parent = '') {
		super(props, 'main', parent, template, classList);
		this._attach();
		const form = this._element?.querySelector('form');
		const link = this._element?.querySelector('.form-button__link');
		link?.addEventListener('click', () => {
			if (this.props.link) {
				Router.getInstance().go(this.props.link.href);
			}
		});
		form?.addEventListener('submit', this.onsubmit.bind(this));
	}

	onsubmit(event: Event): void {
		event.preventDefault();
		let flag = true;
		for (const key in this.childBlocks) {
			const item = this.childBlocks[key];
			if (item instanceof FormInput) {
				const result = item.validator();
				flag = result ? flag : result;
			}
		}
		if (flag) {
			const form = <HTMLFormElement>event.target;
			if (form) {
				const formData = new FormData(form);
				const data: { [key: string]: unknown } = {};
				for (const key of formData.keys()) {
					data[key] = formData.get(key);
				}
				if (window.location.pathname === paths.authorization) {
					this.controller.signIn(data);
				}
				if (window.location.pathname === paths.registration) {
					this.controller.signUp(data);
				}
			}
		}
	}

	show(): void {
		this.controller.logOut();
		super.show();
	}

	componentDidMount(): void {
		this.controller = new FormWindowController();
		const {items, button} = this.props;
		createChildBlocks(items, this.childBlocks);
		this.childBlocks.button = new FormButton(button, '', '.form-window__buttons');
	}

	render(): string {
		const form = this.compile(template);
		return form(this.props);
	}
}
