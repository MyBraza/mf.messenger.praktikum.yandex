import Block from 'components/block';
import template from './template';

interface Props {
	render: {
		returnIcon: string;
		[key: string]: string
	}
	returnCallback: () => void;

}

export default class SettingsHead extends Block {
	props: Props;

	constructor(props: Props, classList: string, parent = '') {
		super(props, 'div', parent, template, `nav-search ${classList}`);
	}

	componentDidRender(): void {
		const returnCallback = this.props.returnCallback ? this.props.returnCallback : () => {
			console.log('click on cog button');
		};
		const returnIcon = this._element?.querySelector('.settings-nav-header__icon');
		returnIcon?.addEventListener('click', (event) => {
			event.preventDefault();
			returnCallback();
		});
	}

	render(): string {
		const element = this.compile(this.template);
		return element(this.props.render);
	}
}
