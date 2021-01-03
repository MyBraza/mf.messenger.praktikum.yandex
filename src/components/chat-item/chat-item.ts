import Block from "../block.js";
import template from "./template.js";

export default class ChatItem extends Block {
	props: {
		id: string,
		action: (arg:unknown)=>void;
		[key: string]: unknown
	};

	constructor(props: { [key: string]: unknown }, classList: string = 'chat-item', parent: string = '', tag: string = 'li') {
		super(props, tag, parent, template, classList);
	}

	componentDidMount() {
		if(!this.props.avatar){
			this.props.avatar = '/img/placeholder.jpg'
		}
		this.props.text = 'No last message in API';
		if (this._element) {
			this._element.dataset.id = this.props.id;
		}
		this._element?.addEventListener('click', event => {
			event.preventDefault();
			const activeEl = document.querySelector('.chat-item.active');
			activeEl?.classList.remove('active');
			this._element?.classList.add('active');
			if (this.props.action) {
				this.props.action(this.props);
			}
		})
	}

	render(): string {
		let element = this.compile(this.template);
		return element(this.props);
	}
}