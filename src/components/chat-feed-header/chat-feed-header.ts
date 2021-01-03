import Block from "../block.js";
import template from "./template.js";
import ChatItem from "../chat-item/chat-item.js";

interface Props {
	chat: {
		[key: string]: string,
	}
	onMenuIcon: ()=>void;
	render?: {
		[key: string]: string,
	}

	[key: string]: unknown
}

export default class ChatFeedHeader extends Block {
	childBlocks: {
		chatItem: ChatItem
	};
	props: Props;

	constructor(props: Props, classList: string, parent: string = '',) {
		super(props, 'div', parent, template, `chat-feed-header ${classList}`);
	}

	componentDidRender() {
		this.childBlocks.chatItem.setProps(this.props.chat);
		this._attach();
		this._element?.addEventListener('click',()=>{
			this.props.onMenuIcon();
		})
	}

	componentDidMount() {
		this.childBlocks.chatItem = new ChatItem(this.props.chat, 'chat-item_static');
	}

	render(): string {
		let element = this.compile(this.template);
		return element({});
	}
}