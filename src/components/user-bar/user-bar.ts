import Block from "../block";
import template from "./template";
import store from "../../utils/store";

interface Props {
	cogButtonCallback?: () => void;
	attributes: {
		settingsIcon?: string;
		[key: string]: unknown
	}
}

export default class UserBar extends Block {
	props: Props;

	constructor(props: Props, classList: string = '', parent: string = '') {
		super(props, 'div', parent, template, `user-bar ${classList}`);
		store.subscribe(this.subscriber, 'userInfo');
	}

	subscriber = (userInfo: { [key: string]: unknown }) => {
		if (!!userInfo) {
			let {display_name, first_name, second_name} = userInfo;
			display_name = display_name ? display_name : `${first_name} ${second_name}`;
			this.setProps({
				attributes: {
					...this.props.attributes,
					...userInfo,
					displayName: display_name
				}
			});
		}
	};

	componentDidMount() {
		const cogButtonCallback = this.props.cogButtonCallback ? this.props.cogButtonCallback : () => {
			console.log('click on cog button, no callback');
		};
		this._element?.addEventListener('click', event => {
			event.preventDefault();
			const settingsIcon = this.props.attributes.settingsIcon ? this.props.attributes.settingsIcon : '';
			if ((<Element>event.target).classList.contains(settingsIcon))
				cogButtonCallback();
		});
	}

	render(): string {
		let element = this.compile(this.template);
		return element(this.props.attributes);
	}
}