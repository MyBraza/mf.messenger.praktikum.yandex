import Block from 'components/block';
import store from 'utils/store';
import template from './template';
import Message from '../message/message';

export default class MessageList extends Block {
	props: {
		messages?: Array<{ [key: string]: string }>;
		users?: Array<{ [key: string]: string }>;
	};

	constructor(parent = '', props: Record<string, unknown> = {}, classList = '', tag = 'main') {
		super(props, tag, parent, template, `chat-feed ${classList}`);
		store.subscribe(this.messagesSubscriber, 'messages');
		store.subscribe(this.usersSubscriber, 'chat-users');
	}

	messagesSubscriber = (data: Array<{ [key: string]: string }>): void => {
		this.setProps(data, 'messages');
		this._element?.parentElement?.scrollTo(0, this._element.parentElement.scrollHeight);
	};

	usersSubscriber = (data: Array<{ [key: string]: string }>): void => {
		this.setProps(data, 'users');
	};

	componentDidRender(): void {
		this.childBlocks = {};
		this.props.messages?.forEach((message, id) => {
			const userId = message.user_id || message.userId;
			const user = this.props.users?.find((item) => item.id === userId);
			this.childBlocks[id] = new Message({message, user});
		});
		this._attach();
	}

	render(): string {
		const element = this.compile(this.template);
		return element({});
	}
}
