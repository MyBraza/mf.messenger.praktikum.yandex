import Block from 'components/block';
import store from 'utils/store';
import template from './template';

interface Props {
	cogButtonCallback?: () => void;
	attributes: {
		settingsIcon?: string;
		[key: string]: unknown
	}
}

export default class UserBar extends Block {
	props: Props;

	constructor(props: Props, classList = '', parent = '') {
		super(props, 'div', parent, template, `user-bar ${classList}`);
		store.subscribe(this.subscriber, 'userInfo');
	}

	subscriber = (userInfo: { [key: string]: unknown }): void => {
		if (userInfo) {
			let {display_name} = userInfo;
			const {first_name, second_name} = userInfo;
			display_name = display_name || `${first_name} ${second_name}`;
			this.setProps({
				attributes: {
					...this.props.attributes,
					...userInfo,
					displayName: display_name,
				},
			});
		}
	};

	componentDidMount(): void {
		const cogButtonCallback = this.props.cogButtonCallback ? this.props.cogButtonCallback : () => {
			console.log('click on cog button, no callback');
		};
		this._element?.addEventListener('click', (event) => {
			event.preventDefault();
			const settingsIcon = this.props.attributes.settingsIcon ? this.props.attributes.settingsIcon : '';
			if ((<Element>event.target).classList.contains(settingsIcon)) {
				cogButtonCallback();
			}
		});
	}

	render(): string {
		const element = this.compile(this.template);
		return element(this.props.attributes);
	}
}
