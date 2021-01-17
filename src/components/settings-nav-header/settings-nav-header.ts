import Block from "../block";
import template from "./template";

interface Props {
	render: {
		returnIcon: string;
		[key: string]: string
	}
	returnCallback: () => void;

}

export default class SettingsHead extends Block {
	props: Props;

	constructor(props: Props, classList: string, parent: string = '',) {
		super(props, 'div', parent, template, `nav-search ${classList}`);
	}

	componentDidRender() {
		const returnCallback = this.props.returnCallback ? this.props.returnCallback : () => {
			console.log('click on cog button')
		};
		const returnIcon = this._element?.querySelector('.settings-nav-header__icon');
		returnIcon?.addEventListener('click', event => {
			event.preventDefault();
			returnCallback();
		});
	}

	render(): string {
		let element = this.compile(this.template);
		return element(this.props.render);
	}
}