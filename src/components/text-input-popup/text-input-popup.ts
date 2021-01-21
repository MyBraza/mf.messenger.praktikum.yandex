import Block from 'components/block';
import template from './template';
import FormButton from '../button/form-button';

export default class TextInputPopup extends Block {
	props: {
		callback: (value: unknown) => void;
		[key: string]: unknown
	};

	constructor(props: Record<string, unknown>, classList = '', parent = '') {
		super(props, 'div', parent, template, `text-input-popup ${classList}`);
	}

	componentDidMount(): void {
		this.childBlocks.button = new FormButton({
			attributes: {class: 'form-button'},
			text: 'Create',
			callback: this.onClick,
		});
	}

	componentDidRender(): void {
		this._attach();
	}

	onClick = (): void => {
		const input = this._element?.querySelector('input');
		const value = input ? input.value : undefined;
		this.props.callback(value);
		this.hide();
	};

	show(): void {
		super.show();
		this.childBlocks.button.setProps({callback: this.onClick});
	}

	render(): string {
		const form = this.compile(this.template);
		return form({});
	}
}
