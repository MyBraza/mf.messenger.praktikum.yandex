import Block from "../block";
import template from "./template";
import store from "../../utils/store";

export default class MessageInput extends Block {
	socket: WebSocket;

	constructor(props: {}, classList: string = '', parent = '', tag: string = 'div') {
		super(props, tag, parent, template, `${classList}`);
		store.subscribe(this.getSocket, 'socket');
	}

	getSocket = (socket: WebSocket) => {
		this.socket = socket;
	};

	componentDidRender() {
		const el = this.element?.querySelector('form');
		el?.addEventListener('submit', event => {
			event.preventDefault();
			const input = this.element?.querySelector('#message-input-message') as HTMLInputElement;
			this.socket.send(JSON.stringify({
				content: input?.value,
				type: 'message',
			}));
			input.value = '';
		})
	}

	render(): string {
		let element = this.compile(this.template);
		return element(this.props);
	}
}