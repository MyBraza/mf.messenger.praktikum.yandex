import Block from 'components/block';
import template from './template';

export default class ChatItem extends Block {
	props: {
		id: string,
		action: (arg: unknown) => void;
		[key: string]: unknown
	};

	constructor(props: { [key: string]: unknown }, classList = 'chat-item', parent = '', tag = 'li') {
		super(props, tag, parent, template, classList);
		this.props.text = 'No last message in API';
	}

	componentDidMount(): void {
		if (this._element) {
			this._element.dataset.id = this.props.id;
		}
		this._element?.addEventListener('click', (event) => {
			event.preventDefault();
			const activeEl = document.querySelector('.chat-item.active');
			activeEl?.classList.remove('active');
			this._element?.classList.add('active');
			if (this.props.action) {
				this.props.action(this.props);
			}
		});
	}

	render(): string {
		let {avatar} = this.props;
		avatar = avatar ? `https://ya-praktikum.tech/${avatar}` : 'img/placeholder.jpg';
		const element = this.compile(this.template);
		return element({...this.props, avatar});
	}
}
