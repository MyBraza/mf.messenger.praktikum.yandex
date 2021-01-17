import Block from "../block";
import template from "./template";
import store from "../../utils/store";
import Message from "../message/message";

export default class MessageList extends Block {
	props: {
		messages?: Array<{ [key: string]: string }>;
		users?: Array<{ [key: string]: string }>;
	};

	constructor(parent: string = '', props: {} = {}, classList: string = '', tag: string = 'main') {
		super(props, tag, parent, template, `chat-feed ${classList}`);
		store.subscribe(this.messagesSubscriber, 'messages');
		store.subscribe(this.usersSubscriber, 'chat-users');
	}

	messagesSubscriber = (data: Array<{ [key: string]: string }>) => {
		this.setProps(data, 'messages');
	};

	usersSubscriber = (data: Array<{ [key: string]: string }>) => {
		this.setProps(data, 'users');
	};

	componentDidRender() {
		this.childBlocks = {};
		this.props.messages?.forEach((message, id) => {
			const userId = message.user_id || message.userId;
			const user = this.props.users?.find(item => item.id === userId);
			this.childBlocks[id] = new Message({message, user});
		});
		this._attach();
	}

	render(): string {
		let element = this.compile(this.template);
		return element({});
	}
}
