import Block from 'components/block';
import template from './template';

interface Props {
	[key: string]: unknown
}

export default class FormInputImage extends Block {
	props: Props;

	input: HTMLInputElement;

	constructor(props: Props, classList = '', parent = '') {
		super(props, 'div', parent, template, `form-input-image ${classList}`);
	}

	componentDidRender(): void {
		this.input = this._element?.querySelector('input') as HTMLInputElement;
		this.input?.addEventListener('change', (e) => {
			e.preventDefault();
			const image = this._element?.querySelector('img');
			if (this.input.files && this.input.files[0] && image) {
				const reader = new FileReader();
				reader.onload = function (e) {
					image.src = e.target?.result as string;
				};
				reader.readAsDataURL(this.input.files[0]);
			}
		});
		const button = this._element?.querySelector('.form-input-image__button');
		button?.addEventListener('click', this.onClick);
	}

	onClick = (): void => {
		this.input?.click();
	};

	render(): string {
		let {value} = this.props;
		value = value || '/img/placeholder.jpg';
		const form = this.compile(template);
		return form({value});
	}
}
