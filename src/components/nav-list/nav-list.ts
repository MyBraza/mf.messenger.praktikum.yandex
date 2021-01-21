import Block from 'components/block';
import store from 'utils/store';
import ChatsController from 'utils/chats-controller';
import template from './template';
import ChatItem from '../chat-item/chat-item';
import FormButton from '../button/form-button';
import TextInputPopup from '../text-input-popup/text-input-popup';

interface Props {
	items: {
		[key: string]: {
			[key: string]: string
		}
	}
	callback?: (arg: unknown) => void;
}

export default class NavList extends Block {
	props: Props;

	controller: ChatsController;

	constructor(props: Props, classList = '', parent = '', tag = 'ul') {
		super(props, tag, parent, template, `nav-list ${classList}`);
		store.subscribe(this.subscriber, 'chats');
	}

	subscriber = (chats: Array<{ [key: string]: string }>): void => {
		const data: { [key: string]: unknown } = {};
		chats?.forEach((value) => {
			data[value.id] = value;
		});
		this.setProps({items: data});
	};

	openAddChatSubmenu = (): void => {
		const el = this.childBlocks.popup.element;
		if (el?.style.display === 'none') {
			this.childBlocks.popup.show();
		} else {
			this.childBlocks.popup.hide();
		}
	};

	componentDidMount(): void {
		this.controller = new ChatsController();
	}

	componentDidRender(): void {
		this.childBlocks = {};
		for (const key in this.props.items) {
			this.childBlocks[key] = new ChatItem({...this.props.items[key], action: this.props.callback});
		}
		this.childBlocks.addChat = new FormButton({
			attributes: {class: 'form-button form-button_empty'},
			text: 'CREATE CHAT',
			callback: () => {
				this.openAddChatSubmenu();
			},
		});
		this.childBlocks.popup = new TextInputPopup({callback: this.controller.createChat});
		this.childBlocks.popup.hide();
		this._attach();
	}

	show(): void {
		super.show();
		this.childBlocks.popup.hide();
	}

	render(): string {
		const element = this.compile(this.template);
		return element({});
	}
}
