import Router from 'utils/router';
import Block from 'components/block';
import template from './template';

export default class AlertPage extends Block {
	constructor(props: Record<string, unknown>, classList: string, parent = '') {
		super(props, 'main', parent, template, classList);
		const button = this._element?.querySelector('.error-window__button');
		button?.addEventListener('click', () => {
			Router.getInstance().go();
		});
	}

	render(): string {
		const element = this.compile(this.template);
		return element(this.props);
	}
}
