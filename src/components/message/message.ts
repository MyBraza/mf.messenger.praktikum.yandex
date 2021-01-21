import Block from 'components/block';
import template from './template';

export default class Message extends Block {
	props: {
		[key: string]: { [key: string]: string }
	};

	constructor(props: Record<string, unknown>, classList = '', parent = '', tag = 'div') {
		super(props, tag, parent, template, `message ${classList}`);
	}

	render(): string {
		const {message, user} = this.props;
		if (user) {
			let {avatar, display_name} = user;
			const {first_name, second_name} = user;
			avatar = avatar ? `https://ya-praktikum.tech/${avatar}` : 'img/placeholder.jpg';
			display_name = display_name || `${first_name} ${second_name}`;
			const element = this.compile(this.template);
			return element({message, avatar, display_name});
		}
		this._element = null;
		return '';
	}
}
