import Block from 'components/block';
import Router from 'utils/router';
import template from './template';

export default class SettingsItem extends Block {
	props: { [key: string]: unknown };

	constructor(props: { [key: string]: unknown }, classList = 'settings-item', parent = '', tag = 'li') {
		super(props, tag, parent, template, classList);
	}

	componentDidRender(): void {
		this._element?.addEventListener('click', () => {
			if (!!this.props.path && typeof this.props.path === 'string') {
				const {path} = this.props;
				Router.getInstance().go(path);
			}
			if (!!this.props.callback && typeof this.props.callback === 'function') {
				this.props.callback();
			}
		});
	}

	render(): string {
		const element = this.compile(this.template);
		return element(this.props);
	}
}
