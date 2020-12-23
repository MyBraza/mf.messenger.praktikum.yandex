import Block from "../block.js";
import template from "./template.js";

interface Props {
	cogButtonCallback?: () => void;
	render: {
		settingsIcon?: string;
		[key: string]: unknown
	}
}

export default class UserBar extends Block {
	props: Props;

	constructor(props: Props, classList: string = '', parent: string = '') {
		super( props,'div', parent, template, `user-bar ${classList}`);
	}

	componentDidMount() {
		const cogButtonCallback = this.props.cogButtonCallback ? this.props.cogButtonCallback : () => {
			console.log('click on cog button, no callback');
		};
		this._element?.addEventListener('click', event => {
			event.preventDefault();
			const settingsIcon = this.props.render.settingsIcon ? this.props.render.settingsIcon : 'icon';
			if ((<Element>event.target).classList.contains(settingsIcon))
				cogButtonCallback();
		});
	}

	render(): string {
		let element = this.compile(this.template);
		return element(this.props.render);
	}
}