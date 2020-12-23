import Block from "../block.js";
import template from "./template.js";
import MessageInput from "../message-input/message-input.js";
import Message from "../message/message.js";

interface Props {
	list: {
		[key: string]: Array<{ [key: string]: string }>
	}
	messageInput: {
		[key: string]: string;
	}
	user: {
		[key: string]: string;
	}
	contacts: {
		[key: string]: { [key: string]: string; };
	}
	currentChat: string;
	noCurrentChat?: () => void;
}

export default class ChatFeed extends Block {

	messageInput: MessageInput;
	message: Message;
	props: Props;

	constructor(props: Props, classList: string = '', parent: string = '', tag: string = 'main') {
		super(props, tag,  parent, template, `chat-feed ${classList}`);
	}

	componentDidMount() {
		this.message = new Message({});
		this.messageInput = new MessageInput(this.props.messageInput);
	}

	render(): string {
		let messagesRender = '';
		const {list, currentChat, contacts, user} = this.props;
		list[currentChat]?.forEach(function (message) {
			const sender = message.sender === 'user' ? user : contacts[message.sender];
			this.message.setProps({
				userImg: sender.imgURL,
				displayName: sender.displayName,
				date: message.date,
				contentText: message.contentText
			});
			messagesRender += this.message.getContent();
		}, this);
		const render = {
			messageInputRender: this.messageInput.getContent(),
			messages: messagesRender,
		};
		let element = this.compile(this.template);
		return element(render);
	}
}
