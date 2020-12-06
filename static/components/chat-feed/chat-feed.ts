import Block from "../block.js";
import template from "./template.js";
import messageInput from "../message-input/message-input.js";
import message from "../message/message.js";

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
	render?: {
		[key: string]: string
	};
}

export default class chatFeed extends Block {

	messageInput: messageInput;
	message: message;
	props: Props;

	constructor(props: Props, classList: string = '', parent: string = '', tag: string = 'main') {
		super(tag, props, parent, template, `chat-feed ${classList}`);
	}

	componentDidMount() {
		this.message = new message({});
		this.messageInput = new messageInput(this.props.messageInput);
	}

	render(): string {
		let messagesRender = '';
		this.props.list[this.props.currentChat]?.forEach(function (message) {
			const sender = message.sender === 'user' ? this.props.user : this.props.contacts[message.sender];
			this.message.setProps({
				userImg: sender.imgURL,
				displayName: sender.displayName,
				date: message.date,
				contentText: message.contentText
			});
			messagesRender += this.message.getContent();
		}, this);
		this.setProps({
			render: {
				messageInputRender: this.messageInput.getContent(),
				messages: messagesRender,
			}
		});
		let element = this.compile(this.template);
		return element(this.props.render);
	}
}
