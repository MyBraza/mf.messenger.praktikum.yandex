import Block from "../block.js";
import template from "./template.js";

export default class UserItem extends Block {
	props: {
		id: string,
		action: (arg:unknown)=>void;
		[key: string]: unknown
	};

	constructor(props: { [key: string]: unknown }, classList: string = 'chat-item_static chat-item_active', parent: string = '', tag: string = 'li') {
		super(props, tag, parent, template, classList);
	}

	componentDidRender() {
		const el = this._element?.querySelector('.chat-item__action-icon');
		el?.addEventListener('click', event => {
			event.preventDefault();
			if (this.props.action) {
				this.props.action(this.props.id);
			}
		})
	}

	componentDidMount() {
		if(!this.props.avatar){
			this.props.avatar = '/img/placeholder.jpg'
		}
		this.props.text = 'No last message in API';
	}

	render(): string {
		let element = this.compile(this.template);
		return element(this.props);
	}
}