import Block from 'components/block';
import template from './template';

export default class ChooseChat extends Block {
	constructor(props: Record<string, unknown>, classList: string, parent = '') {
		super(props, 'div', parent, template, classList);
	}

	render(): string {
		const element = this.compile(this.template);
		return element(this.props);
	}
}
