import Block from 'components/block';
import template from './template';

export default class NavSearch extends Block {
	constructor(props: Record<string, unknown>, classList: string, parent = '') {
		super(props, 'div', parent, template, `nav-search ${classList}`);
	}

	render(): string {
		const element = this.compile(this.template);
		return element(this.props);
	}
}
