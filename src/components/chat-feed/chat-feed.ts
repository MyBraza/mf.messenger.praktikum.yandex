import Block from 'components/block';
import ChatsController from 'utils/chats-controller';
import template from './template';
import MessageInput from '../message-input/message-input';
import MessageList from '../chat-feed-message-list/chat-feed-message-list';

interface Props {
	messageInput: {
		[key: string]: string;
	}
	user: {
		[key: string]: string;
	}
	chat: {
		[key: string]: string;
	}
	noCurrentChat?: () => void;
}

export default class ChatFeed extends Block {
	props: Props;

	controller: ChatsController;

	constructor(props: Props, classList = '', parent = '', tag = 'main') {
		super(props, tag, parent, template, `chat-feed ${classList}`);
	}

	componentDidRender(): void {
		this._attach();
	}

	componentDidMount(): void {
		this.controller = new ChatsController();
		this.childBlocks.messageList = new MessageList('.chat-feed__scrollable');
		this.childBlocks.messageInput = new MessageInput(this.props.messageInput);
	}

	render(): string {
		const element = this.compile(this.template);
		return element({});
	}
}
