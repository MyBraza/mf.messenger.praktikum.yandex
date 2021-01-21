import Block from 'components/block';
import store from 'utils/store';
import template from './template';

export default class MessageInput extends Block {
	socket: WebSocket;

	constructor(props: Record<string, unknown>, classList = '', parent = '', tag = 'div') {
		super(props, tag, parent, template, `${classList}`);
		store.subscribe(this.getSocket, 'socket');
	}

	getSocket = (socket: WebSocket): void => {
		this.socket = socket;
	};

	componentDidRender(): void {
		const el = this.element?.querySelector('form');
		el?.addEventListener('submit', (event) => {
			event.preventDefault();
			const input = this.element?.querySelector('#message-input-message') as HTMLInputElement;
			this.socket.send(JSON.stringify({
				content: input?.value,
				type: 'message',
			}));
			input.value = '';
		});
	}

	render(): string {
		const element = this.compile(this.template);
		return element(this.props);
	}
}
