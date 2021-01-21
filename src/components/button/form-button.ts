import Block from 'components/block';
import Handlebars from 'handlebars';
import template from './template';

Handlebars.registerHelper('properties', (context, options) => {
	const cells = [];
	let html;
	for (const k in context) {
		if (Object.prototype.hasOwnProperty.call(context, k)) {
			html = options.fn({
				key: k,
				value: context[k],
			});
			cells.push(html);
		}
	}
	return cells.join('');
});

export default class FormButton extends Block {
	props: {
		callback?: (() => void),
		[key: string]: unknown
	};

	constructor(props: Record<string, unknown>, classList = '', parent = '') {
		super(props, 'div', parent, template, `form-button-container ${classList}`);
	}

	componentDidMount(): void {
		this._element?.addEventListener('click', (event) => {
			if (this.props.callback) {
				event.preventDefault();
				this.props.callback();
			}
		});
	}

	render(): string {
		const form = this.compile(this.template);
		return form(this.props);
	}
}
