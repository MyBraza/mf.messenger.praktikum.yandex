import Block from 'components/block';
import formItemsHelper from 'utils/formItemsHelper';
import createChildBlocks from 'utils/create-child-blocks';
import store from 'utils/store';
import template from './template';
import FormInput from '../form-input/form-input';
import FormButton from '../button/form-button';
import FormInputImage from '../form-input-image/form-input-image';

formItemsHelper();

interface Button {
	attributes: { [key: string]: string };
	text: string;

	[key: string]: unknown;
}

interface Props {
	elements: {
		formInputs: { [key: string]: { [key: string]: string } };
		buttons: {
			[key: string]: Button
		}
	}

	onSubmit?: (form: unknown) => void;
	onCancel?: () => void;

	[key: string]: unknown
}

export default class ProfileSettings extends Block {
	childBlocks: {
		avatar: FormInputImage;
		[id: string]: FormInput | FormButton | FormInputImage
	};

	props: Props;

	constructor(props: Props, classList: string, parent = '') {
		super(props, 'main', parent, template, `profile-settings ${classList}`);
		store.subscribe(this.subscriber, 'userInfo');
	}

	subscriber = (userInfo: { [key: string]: unknown }): void => {
		for (const key in userInfo) {
			this.childBlocks[key]?.setProps({value: userInfo[key]});
		}
	};

	componentDidMount(): void {
		const {formInputs, buttons} = this.props.elements;
		createChildBlocks(formInputs, this.childBlocks);
		this.childBlocks.avatar = new FormInputImage({}, '');
		this.childBlocks.submitButton = new FormButton(buttons.submitButton, '', '.form-window__buttons_row');
		this.childBlocks.cancelButton = new FormButton({
			...buttons.cancelButton,
			callback: this.props.onCancel,
		}, '', '.form-window__buttons_row');
	}

	_addEventListeners(): void {
		const onSubmit = (event: Event): void => {
			event.preventDefault();
			let flag = true;
			for (const key in this.childBlocks) {
				const item = this.childBlocks[key];
				if (item instanceof FormInput) {
					const result = item.validator();
					flag = result ? flag : result;
				}
			}
			const form = event.target as HTMLFormElement;
			if (flag) {
				const callback = this.props.onSubmit ? this.props.onSubmit : (form: unknown) => {
					console.log(`Form:${form}`);
				};
				const formData = new FormData(form);
				const avatar = this.childBlocks.avatar.input;
				if (avatar.files) formData.append('avatar', avatar.files[0]);
				callback(formData);
				avatar.value = '';
			}
		};
		const form = this._element?.querySelector('form');
		form?.addEventListener('submit', onSubmit);
	}

	componentDidRender(): void {
		this._addEventListeners();
		this._attach();
	}

	render(): string {
		const compile = this.compile(template);
		return compile(this.props.elements);
	}
}
