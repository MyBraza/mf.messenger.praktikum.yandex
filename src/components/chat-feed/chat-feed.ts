import Block from "../block";
import template from "./template";
import MessageInput from "../message-input/message-input";

interface Props {
	messageInput: {
		[key: string]: string;
	}
	user: {
		[key: string]: string;
	}
	chat:{
		[key: string]: string;
	}
	noCurrentChat?: () => void;
}

export default class ChatFeed extends Block {
	props: Props;

	constructor(props: Props, classList: string = '', parent: string = '', tag: string = 'main') {
		super(props, tag,  parent, template, `chat-feed ${classList}`);
	}

	componentDidRender() {
		this._attach()
	}

	componentDidMount() {
		this.childBlocks.messageInput = new MessageInput(this.props.messageInput);
	}

	render(): string {
		let element = this.compile(this.template);
		return element({});
	}
}
