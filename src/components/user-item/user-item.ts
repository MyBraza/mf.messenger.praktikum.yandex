import Block from 'components/block';
import template from './template';

export default class UserItem extends Block {
	props: {
		id: string,
		action: (arg: unknown) => void;
		[key: string]: unknown
	};

	constructor(props: { [key: string]: unknown }, classList = 'chat-item_static chat-item_active', parent = '', tag = 'li') {
		super(props, tag, parent, template, classList);
	}

	componentDidRender(): void {
		const el = this._element?.querySelector('.chat-item__action-icon');
		el?.addEventListener('click', (event) => {
			event.preventDefault();
			if (this.props.action) {
				this.props.action(this.props.id);
			}
		});
	}

	render(): string {
		let {display_name, avatar} = this.props;
		const {first_name, second_name} = this.props;
		display_name = display_name || `${first_name} ${second_name}`;
		avatar = avatar ? `https://ya-praktikum.tech/${avatar}` : 'img/placeholder.jpg';
		const element = this.compile(this.template);
		return element({...this.props, avatar, display_name});
	}
}
